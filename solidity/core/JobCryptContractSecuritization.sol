// SPDX-License-Identifier: APACHE 2.0
pragma solidity >=0.8.0 <0.9.0;

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/2583caf3357fe411e4a60feced77d0e81f6c45f0/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativesAdmin.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "../interfaces/IJobCryptSecuritization.sol";

contract JobCryptSecuritization is OpenRolesSecure, IOpenRolesManaged, IJobCryptSecuritization { 

    IOpenRegister registry; 
    IOpenRolesDerivativesAdmin iorda; 

    uint256 version                     = 3; 
    string name                         = "RESERVED_JOBCRYPT_DERIVATIVE_CONTRACT_SECURITIZATION"; 

    string registerCA                   = "RESERVED_OPEN_REGISTER";
    string roleManagerCA                = "RESERVED_OPEN_ROLES";

    string factoryRole                  = "FACTORY_ROLE";
    string coreRole                     = "JOBCRYPT_CORE_ROLE"; 

    string localPostingEditor           = "LOCAL_POSTING_EDITOR_ROLE";
    string jobCryptPostingRole          = "JOBCRYPT_POSTING_ROLE";
    string localBarredApplicantRole     = "LOCAL_BARRED_APPLICANT_ROLE";

    string [] postingLocalRoles         = [localPostingEditor, jobCryptPostingRole, localBarredApplicantRole];

    string localDashboardEditor         = "LOCAL_DASHBOARD_EDITOR_ROLE";
    string localDashboardViewer         = "LOCAL_DASHBOARD_VIEWER_ROLE";

    string localDashboardModerator      = "LOCAL_DASHBOARD_MODERATOR_ROLE";

    string [] dashboardRoles            = [localDashboardEditor, localDashboardViewer, localDashboardModerator];

    string jobPostingType               = "JOBCRYPT_JOB_POSTING_TYPE";
    string employerDashboardType        = "EMPLOYER_DASHBOARD_TYPE";
    string jobSeekerDashboardType       = "JOBSEEKER_DASHBOARD_TYPE";

    
    // open roles managed
    string [] roleNames                 = [factoryRole]; 

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    // derivatives
    mapping(string=>string[]) jobPostingFunctionsForPostingByRole;
    mapping(string=>string[]) employerDashboardFunctionsForPostingByRole;
    mapping(string=>string[]) jobSeekerDashboardFunctionsForPostingByRole;


    constructor(address _registryAddress) { 
        registry = IOpenRegister(_registryAddress);
        setRoleManager(registry.getAddress(roleManagerCA));
       
        iorda = IOpenRolesDerivativesAdmin(roleManager.getDerivativeContractsAdmin(registry.getDapp()));   
        
        addConfigurationItem(registerCA, _registryAddress, 0);   
        addConfigurationItem(roleManagerCA, address(roleManager), 0);   
        addConfigurationItem("OPEN_ROLES_DERIVATIVES_ADMIN", address(iorda), 0);   
        addConfigurationItem(name, self, version);

        initDefaultFunctionsForRoles();
        initDerivativeFunctionsForRoles();
    }

    function getVersion() override view external returns (uint256 _version){
        return version; 
    }

    function getName() override view external returns (string memory _contractName){
        return name;
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

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(coreRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        return true; 
    }

    function secureEmployerDashboard(address _dashboard, address _dashboardOwner) override external returns (bool _secured) {
        require(isSecure(factoryRole, "secureEmployerDashboard"), "jobcrypt factory only ");  

        registry.registerAddress(_dashboardOwner, "POSTING_OWNER");

        registry.registerDerivativeAddress(_dashboard, employerDashboardType );

        iorda.addDerivativeContract(_dashboard, employerDashboardType);        
        
        iorda.addRolesForDerivativeContract(_dashboard, dashboardRoles);

        for(uint x = 0; x < dashboardRoles.length; x++){
            iorda.addFunctionsForRoleForDerivativeContract(_dashboard, dashboardRoles[x], employerDashboardFunctionsForPostingByRole[dashboardRoles[x]]);
        }

        address [] memory users_ = new address[](1);
        users_[0] = _dashboardOwner;

        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardViewer, users_ );
        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardEditor, users_ );

        return true;
    }

    function secureJobSeekerDashboard(address _dashboard, address _dashboardOwner) override external returns (bool _secured) {
        require(isSecure(factoryRole, "secureJobSeekerDashboard"), "jobcrypt factory only ");  

        
        registry.registerAddress(_dashboardOwner, "DASHBOARD_OWNER");
        
        registry.registerDerivativeAddress(_dashboard, jobSeekerDashboardType);

        iorda.addDerivativeContract(_dashboard, jobSeekerDashboardType);        

        
        iorda.addRolesForDerivativeContract(_dashboard, dashboardRoles);

        for(uint x = 0; x < dashboardRoles.length; x++){
            iorda.addFunctionsForRoleForDerivativeContract(_dashboard, dashboardRoles[x], jobSeekerDashboardFunctionsForPostingByRole[dashboardRoles[x]]);
        }

        address [] memory users_ = new address[](1);
        users_[0] = _dashboardOwner;

        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardViewer, users_ );
        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardEditor, users_ );
    
        return true;
    }

    function secureJobPosting(address _jobPosting, address _postingOwner) override external returns (bool _secured) {
        require(isSecure(factoryRole, "secureJobPosting"), "jobcrypt factory only ");  
        
        // register the posting as a known address 
        registry.registerAddress(_jobPosting, "POSTING_OWNER");
                
        registry.registerDerivativeAddress(_postingOwner, jobPostingType);
        
        // create role default lists for the posting including owner        
        iorda.addDerivativeContract(_jobPosting, jobPostingType);

        // set up the posting owner role lists (local roles)
        iorda.addRolesForDerivativeContract(_jobPosting, postingLocalRoles); 
        for(uint x = 0; x < postingLocalRoles.length; x++){
            iorda.addFunctionsForRoleForDerivativeContract(_jobPosting, postingLocalRoles[x], jobPostingFunctionsForPostingByRole[postingLocalRoles[x]]);
        }

        address [] memory postingLocalUsers_ = new address[](1);
        postingLocalUsers_[0] = _postingOwner;
        iorda.addUsersForRoleForDerivativeContract(_jobPosting, localPostingEditor, postingLocalUsers_);

        return true;
    }

    // =============================== INTERNAL =================================================



    function initDefaultFunctionsForRoles() internal returns (bool _initiated) {
        hasDefaultFunctionsByRole[factoryRole] = true; 
        
        defaultFunctionsByRole[factoryRole].push("secureEmployerDashboard");
        defaultFunctionsByRole[factoryRole].push("secureJobSeekerDashboard");
        defaultFunctionsByRole[factoryRole].push("secureJobPosting");    
        return true; 
    }
    
    function initDerivativeFunctionsForRoles() internal returns (bool _initiated) {
        // employer dashboard
        employerDashboardFunctionsForPostingByRole[localDashboardViewer].push("getPostings");
        employerDashboardFunctionsForPostingByRole[localDashboardViewer].push("findPostedJobs");
        
        employerDashboardFunctionsForPostingByRole[localDashboardEditor].push("removePosting");

        employerDashboardFunctionsForPostingByRole[localDashboardModerator].push("getPostingHistory");
        employerDashboardFunctionsForPostingByRole[localDashboardModerator].push("addJobPosting");

        // Job seeker dashboard
        jobSeekerDashboardFunctionsForPostingByRole[localDashboardViewer].push("getAppliedJobs");

        jobSeekerDashboardFunctionsForPostingByRole[localDashboardEditor].push("removeAppliedJob");
                        
        jobSeekerDashboardFunctionsForPostingByRole[localDashboardModerator].push("addJobApplication");
        
        // job posting
        jobPostingFunctionsForPostingByRole[localPostingEditor].push("populatePosting");
        jobPostingFunctionsForPostingByRole[localPostingEditor].push("setCategories");
        jobPostingFunctionsForPostingByRole[localPostingEditor].push("setSkillsRequired");
        jobPostingFunctionsForPostingByRole[localPostingEditor].push("setApplyLink");
        jobPostingFunctionsForPostingByRole[localPostingEditor].push("setFeatures");
        jobPostingFunctionsForPostingByRole[localPostingEditor].push("getFee");

        jobPostingFunctionsForPostingByRole[jobCryptPostingRole].push("setExpiryDate");        
        jobPostingFunctionsForPostingByRole[jobCryptPostingRole].push("setPostingStatus");

        jobPostingFunctionsForPostingByRole[localBarredApplicantRole].push("applyForJob");

        return true; 
    }

}