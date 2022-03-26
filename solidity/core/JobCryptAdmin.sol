//"SPDX-License-Identifier: UNLICENSED"
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title JobSeeker Dashboard
 * @dev 
 */


import "https://github.com/Block-Star-Logic/open-version/blob/main/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/e4b13aa98d04510d7daa6d11ec16ec890f73663f/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-libraries/blob/16a705a5421984ca94dc72fff100cb406ac9aa96/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "https://github.com/Block-Star-Logic/open-roles/blob/da64281ff9a0be20c800f1c3e61a17bce99fc90d/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativeAdmin.sol";

import "../interfaces/IJobCryptAdmin.sol";

import "./JcJobPosting.sol";


contract JobCryptAdmin is IJobCryptAdmin,  IOpenRolesManaged { 

    using LOpenUtilities for string;

    uint256 version = 5; 

    string name; 

    string dappName = "JOBCRYPT";

    string private status; 
    
    bool shutdown = false; 

    bool securityActive = true; // seucrity is on 

    address rootAdmin; 

    address self; 

    IOpenRoles roleManager; 
    
    IOpenRegister registry; 

    string coreRole                 = "JOBCRYPT_CORE_ROLE";
    
    string jobPostingType           = "JOBCRYPT_JOB_POSTING_TYPE";
    string employerDashboardType    = "EMPLOYER_DASHBOARD_TYPE";
    string jobSeekerDashboardType   = "JOBSEEKER_DASHBOARD_TYPE";

    // JobCrypt dApp Roles 
    string [] roleNames = [coreRole];

    string rootAdminCA      = "JOBCRYPT_ROOT_ADMIN";
    string roleManagerCA    = "JOBCRYPT_ROLE_MANAGER";

    string [] addressNames = [rootAdminCA, roleManagerCA ]; // address names to listen for changes in the registry 

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    
    
    // local posting management 
    string localPostingEditor          = "LOCAL_POSTING_EDITOR_ROLE";
    string localPostingViewer          = "LOCAL_POSTING_VIEWER_ROLE";
    string localPostingOwner           = "LOCAL_POSTING_OWNER_ROLE";
    string localPostingApplicant       = "LOCAL_POSTING_APPLICANT_ROLE";
    string localPostingModerator       = "LOCAL_POSTING_MODERATOR_ROLE";
    string [] postingLocalRoles = [localPostingEditor, localPostingViewer, localPostingApplicant, localPostingModerator, localPostingOwner];

    string localDashboardEditor         = "LOCAL_DASHBOARD_EDITOR_ROLE";
    string localDashboardViewer         = "LOCAL_DASHBOARD_VIEWER_ROLE";
    string localDashboardManager        = "LOCAL_DASHBOARD_MANAGER_ROLE";
    
    mapping(string=>string[]) functionsForPostingByRole;
    

    constructor(string memory _name, address _registryAddress) {
        self               = address(this);
        name               = _name; 
        status             = "ACTIVE";          
        registry           = IOpenRegister(_registryAddress);
        rootAdmin          = registry.getAddress(rootAdminCA); 
        roleManager        = IOpenRoles(registry.getAddress(roleManagerCA));
        
        initJobCryptFunctionsForRoles(); 
        initPostingFunctionsForPostingRoles(); 
    }

    function getVersion() override view external returns (uint256 _version){
        return version; 
    }

    function getName() override view external returns (string memory _contractName){
        return name;
    }

    function getStatus() view external returns (string memory _status) {
        return status; 
    }

    function getDefaultRoles() override view external returns (string [] memory _roleNames){
        return roleNames; 
    }

    function hasDefaultFunctions(string memory _role) override view external returns(bool _hasFunctions){
        return hasDefaultFunctionsByRole[_role];
    } 

    function getDefaultFunctions(string memory _role) override view external returns (string [] memory _functions){
        return defaultFunctionsByRole[_role];
    }

    function getCongifurationAddress(string memory _addressName) override view external returns (address _configurationAddress) {       
        return registry.getAddress(_addressName); 
    }


    function isAllowed(address _contract, string memory _role, string memory _function, address _sender) override view external returns (bool _allowed){
        require(!shutdown, " JOBCRYPT ADMIN : isAllowed : 00 : system is shutdown "); 
        if(isDerivative(_contract)){
            return roleManager.isAllowed(_contract, _role, _function, _sender);
        }
        return roleManager.isAllowed(dappName, _role, _contract, _function, _sender);       
    }

    function isNotBarred(address _contract, string memory _role,  string memory _function, address _sender) override view external returns (bool _barred){
        if(this.isBarred(_contract, _role, _function, _sender)) {
            return false;
        }
        return true; 
    }

    function isBarred(address _contract, string memory _role, string memory _function, address _sender) override view external returns (bool _barred){
        require(!shutdown, " JOBCRYPT ADMIN : isBarred : 00 : system is shutdown ");
        if(isDerivative(_contract)){
            return roleManager.isBarred(_contract, _role, _function, _sender);
        }
        return roleManager.isBarred(dappName, _role, _contract, _function, _sender);
    }


    function registerJobPosting(address _jobPostingAddress) override external returns (bool _registered){  // factory will call this 
        require(isSecure( coreRole,"registerJobPosting", msg.sender ), " JOBCRYPT ADMIN : registerJobPosting : 00 : JobCrypt Core only ");
        
        // register the posting as a known address 
        registry.registerDerivativeAddress(dappName, _jobPostingAddress);

        JcJobPosting posting = JcJobPosting(_jobPostingAddress);
        
        // register the posting owner as a known address 
        registry.registerKnownAddress(posting.getPostingOwner());

        // create role default lists for the posting including owner 
        IOpenRolesDerivativesAdmin iorda = IOpenRolesDerivativesAdmin(roleManager.getDerivativeContractsAdmin(dappName)); 
        iorda.addDerivativeContract(_jobPostingAddress, jobPostingType);

        // set up the posting owner role lists (local roles)
        iorda.addRolesForDerivativeContract(_jobPostingAddress, postingLocalRoles); 

        address [] memory postingLocalUsers_ = new address[](1);
        postingLocalUsers_[0] = posting.getPostingOwner();

        for(uint x = 0; x < postingLocalRoles.length; x++){
            iorda.addFunctionsForRoleForDerivativeContract(_jobPostingAddress, postingLocalRoles[x], functionsForPostingByRole[postingLocalRoles[x]]);
        }

        iorda.addUsersForRoleForDerivativeContract(_jobPostingAddress, localPostingEditor, postingLocalUsers_);
        iorda.addUsersForRoleForDerivativeContract(_jobPostingAddress, localPostingViewer, postingLocalUsers_);
        iorda.addUsersForRoleForDerivativeContract(_jobPostingAddress, localPostingOwner, postingLocalUsers_);

        return true; 
    }

    function registerDashboard(address _dashboardAddress, address _dashboardOwner, string memory _dashboardType) override external returns (bool _registered){ // factory will call this 
        
        require(isSecure( coreRole,"registerDashboard", msg.sender ), " JOBCRYPT ADMIN : registerDashboard : 00 : JobCrypt Core only ");
        
        if(!registry.isKnownAddress(_dashboardOwner)){
            registry.registerKnownAddress(_dashboardOwner);
        }
        registry.registerKnownAddress(_dashboardAddress);

        IOpenRolesDerivativesAdmin iorda = IOpenRolesDerivativesAdmin(roleManager.getDerivativeContractsAdmin(dappName)); 
        iorda.addDerivativeContract(_dashboardAddress, _dashboardType);        

        string [] memory dashboardRoles_ = getDashboardRoles(_dashboardType);
        iorda.addRolesForDerivativeContract(_dashboardAddress, dashboardRoles_);



        address [] memory users_ = new address[](1);
        users_[0] = _dashboardOwner;

        for(uint256 x = 0; x < dashboardRoles_.length; x++){
            iorda.addUsersForRoleForDerivativeContract(_dashboardAddress, dashboardRoles_[x], users_ );
        }
        return true; 
    }

    function emergencyShutdown() external returns (string memory _status ) {
        
        emit CriticalFunctionAccess(msg.sender, " JOBCRYPT ADMIN :- JobCrypt emergency shutdown ");

        require(msg.sender == rootAdmin, " JOBCRYPT ADMIN : emergencyShutdown 00 : root admin only ");  
        status = "SHUTDOWN";
        shutdown = true; 
        return status ; 
    }

    function reactivate() external returns (string memory _status ) {
        
        emit CriticalFunctionAccess(msg.sender, " JOBCRYPT ADMIN : emergencyShutdown : E00 : JobCrypt re-activation ");

        require(msg.sender == rootAdmin, "JOBCRYPT ADMIN :  reactivate : 00 : root admin only ");  
        status = "ACTIVE";
        shutdown = false; 
        return status; 
    }

    function activateSecurity() external returns (bool _securityActive) {
        securityActive = true; 
        return securityActive; 
    }

    function deactivateSecurity() external returns (bool _securityDeactivated) {
        require(msg.sender == rootAdmin, "JOBCRYPT ADMIN :  deactivateSecurity : 00 : root admin only ");  
        securityActive = false; 
        return securityActive;
    }

    // ================================================ INTERNAL ========================================================================

    function getDashboardRoles(string memory _dashboardType) view internal returns (string[] memory _dashBoardRoles) {
        _dashBoardRoles = new string[](2);
        if(_dashboardType.isEqual( employerDashboardType)){
           _dashBoardRoles[0] = localDashboardViewer;
           _dashBoardRoles[1] = localDashboardEditor;
        }

        if(_dashboardType.isEqual( jobSeekerDashboardType )){           
           _dashBoardRoles[0] = localDashboardViewer;
           _dashBoardRoles[1] = localDashboardManager;
        }
        return _dashBoardRoles;
    }

    function initPostingFunctionsForPostingRoles() internal returns(bool _initiatied){

        functionsForPostingByRole[localPostingEditor].push("populatePosting"); 
        functionsForPostingByRole[localPostingEditor].push("setJobTitle"); 
        functionsForPostingByRole[localPostingEditor].push("setDescriptions"); 
        functionsForPostingByRole[localPostingEditor].push("setCategories"); 
        functionsForPostingByRole[localPostingEditor].push("setSkillsRequired"); 
        functionsForPostingByRole[localPostingEditor].push("setLocation"); 
        functionsForPostingByRole[localPostingEditor].push("setApplyLink"); 
        functionsForPostingByRole[localPostingEditor].push("setExpiryDate"); 
        functionsForPostingByRole[localPostingEditor].push("setPostingStatus"); 
        
        functionsForPostingByRole[localPostingModerator].push("getFee"); 

        functionsForPostingByRole[localPostingApplicant].push("applyForJob"); 

       return true; 

    }

    function initJobCryptFunctionsForRoles() internal returns (bool _initiated) {
        
        defaultFunctionsByRole[coreRole].push("registerAddressChangeListener");
        defaultFunctionsByRole[coreRole].push("deregisterAddressChangeListener");
        defaultFunctionsByRole[coreRole].push("registerJobPosting");
        defaultFunctionsByRole[coreRole].push("registerDashboard");
    
        return true; 
    }

    function isDerivative(address _contract) view internal returns(bool _isDerivative){
       return registry.isDerivativeAddress(_contract);
    }

    function isSecure(string memory _role, string memory _function, address _sender ) view internal returns (bool) { 
        if(securityActive){
            return roleManager.isAllowed(dappName, _role, self, _function, _sender);
        }
        return true; 
    }
}