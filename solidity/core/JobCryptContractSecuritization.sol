// SPDX-License-Identifier: APACHE 2.0
pragma solidity ^0.8.14;


import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativeTypesAdmin.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativesAdmin.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/a14334297b2953d3531001bb8624239866d346be/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";


import "../interfaces/IJobCryptSecuritization.sol";

contract JobCryptSecuritization is OpenRolesSecureCore, IOpenVersion, IOpenRolesManaged, IJobCryptSecuritization { 

    IOpenRegister registry; 
    IOpenRolesDerivativeTypesAdmin iordta; 
    IOpenRolesDerivativesAdmin iorda; 

    uint256 version                     = 5; 
    string name                         = "RESERVED_JOBCRYPT_DERIVATIVE_CONTRACT_SECURITIZATION"; 

    string registerCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
    string derivativeContractTypesAdminCA = "RESERVED_OPEN_ROLES_DERIVATIVE_TYPES_ADMIN";

    string jobCryptFactoryRole          = "JOBCRYPT_FACTORY_ROLE";
    string jobCryptCoreRole             = "JOBCRYPT_CORE_ROLE"; 

    string jobCryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";

    string localViewerRole              = "LOCAL_POSTING_VIEWER_ROLE";
    string localEditorRole              = "LOCAL_POSTING_EDITOR_ROLE"; 
    string localApplicantRole           = "LOCAL_POSTING_APPLICANT_ROLE"; 
    string localBarredApplicantRole     = "LOCAL_BARRED_APPLICANT_ROLE";

    string [] postingLocalRoles         = [localViewerRole, localEditorRole, localApplicantRole, localBarredApplicantRole];

    string localDashboardEditor         = "LOCAL_DASHBOARD_EDITOR_ROLE";
    string localDashboardViewer         = "LOCAL_DASHBOARD_VIEWER_ROLE";

    string localDashboardModerator      = "LOCAL_DASHBOARD_MODERATOR_ROLE";

    string [] dashboardRoles            = [localDashboardEditor, localDashboardViewer, localDashboardModerator];

    string jobPostingType               = "JOBCRYPT_JOB_POSTING_TYPE";
    string employerDashboardType        = "EMPLOYER_DASHBOARD_TYPE";
    string jobSeekerDashboardType       = "JOBSEEKER_DASHBOARD_TYPE";

    bool derivativeManagementInitialised = false; 

    // open roles managed
    string [] roleNames                 = [jobCryptFactoryRole, jobCryptAdminRole]; 

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;


    // derivative contract types
    string [] derivativeContractTypes   = [jobPostingType, employerDashboardType, jobSeekerDashboardType];

    mapping(string=>string[]) rolesByDerivativeContractType;
    mapping(string=>mapping(string=>string[])) functionsByRoleByDerivativeContractType; 
    

    // derivatives
    mapping(string=>string[]) jobPostingFunctionsForPostingByRole;
    mapping(string=>string[]) employerDashboardFunctionsForPostingByRole;
    mapping(string=>string[]) jobSeekerDashboardFunctionsForPostingByRole;


    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT"){ 
        
        registry = IOpenRegister(_registryAddress);
        
        setRoleManager(registry.getAddress(roleManagerCA));

        iordta = IOpenRolesDerivativeTypesAdmin(registry.getAddress(derivativeContractTypesAdminCA));

        iorda = IOpenRolesDerivativesAdmin(roleManager.getDerivativeContractsAdmin(registry.getDapp()));                   

        addConfigurationItem(_registryAddress);   
        
        addConfigurationItem(address(roleManager));   
        
        addConfigurationItem(address(iorda));   
        
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

    function isInitialisedDerivativeManagement() view external returns (bool ) {
        return derivativeManagementInitialised; 
    }

    function initializeDerivativeManagement() external returns (bool _derivativeManagementInitialized) {
         require(isSecure(jobCryptAdminRole, "initializeDerivativeManagement")," admin only ");  
        if(!derivativeManagementInitialised){
            // register derivative types 
            iordta.addDerivativeContractTypes(derivativeContractTypes);

            // configurae derivative types 
            for(uint x = 0; x < derivativeContractTypes.length; x++) {
                string memory type_ = derivativeContractTypes[x];
                string [] memory roles_ = rolesByDerivativeContractType[type_];
                iordta.mapRolesToContractType(type_, roles_);
                for(uint y = 0; y < roles_.length; y++) {
                    string memory role_ = roles_[x];
                    string [] memory functions_ = functionsByRoleByDerivativeContractType[type_][role_];
                    iordta.addFunctionsForRoleForDerivativeContactType(type_, role_, functions_);
                }
            }
            return true; 
        }
        return false; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        iorda = IOpenRolesDerivativesAdmin(roleManager.getDerivativeContractsAdmin(registry.getDapp()));   
        iordta = IOpenRolesDerivativeTypesAdmin(registry.getAddress(derivativeContractTypesAdminCA));
        
        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(iorda));   
        addConfigurationItem(address(iordta));
        return true; 
    }

    function secureEmployerDashboard(address _dashboard, address _dashboardOwner) override external returns (bool _secured) {
        require(isSecure(jobCryptFactoryRole, "secureEmployerDashboard"), "jobcrypt factory only ");  

        registry.registerUserAddress(_dashboardOwner, "EMPLOYER_DASHBOARD_OWNER");

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
        require(isSecure(jobCryptFactoryRole, "secureJobSeekerDashboard"), "jobcrypt factory only ");  

        
        registry.registerUserAddress(_dashboardOwner, "JOBSEEKER_DASHBOARD_OWNER");
        
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
        require(isSecure(jobCryptFactoryRole, "secureJobPosting"), "jobcrypt factory only ");  
        
        // register the posting as a known address 
        registry.registerUserAddress(_jobPosting, "POSTING_OWNER");
               
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
        iorda.addUsersForRoleForDerivativeContract(_jobPosting, localEditorRole, postingLocalUsers_);
        iorda.addUsersForRoleForDerivativeContract(_jobPosting, localViewerRole, postingLocalUsers_);
        
        return true;
    }

    // =============================== INTERNAL =================================================



    function initDefaultFunctionsForRoles() internal returns (bool _initiated) {
        hasDefaultFunctionsByRole[jobCryptFactoryRole] = true; 
        
        defaultFunctionsByRole[jobCryptFactoryRole].push("secureEmployerDashboard");
        defaultFunctionsByRole[jobCryptFactoryRole].push("secureJobSeekerDashboard");
        defaultFunctionsByRole[jobCryptFactoryRole].push("secureJobPosting");    
        
        hasDefaultFunctionsByRole[jobCryptAdminRole] = true; 
        defaultFunctionsByRole[jobCryptAdminRole].push("initializeDerivativeManagement");
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");

        return true; 
    }
    
    function initDerivativeFunctionsForRoles() internal returns (bool _initiated) {
        // employer dashboard
        employerDashboardFunctionsForPostingByRole[localDashboardViewer].push("getPostings");
        employerDashboardFunctionsForPostingByRole[localDashboardViewer].push("findPostedJobs");
        
        employerDashboardFunctionsForPostingByRole[localDashboardEditor].push("removePosting");

        employerDashboardFunctionsForPostingByRole[localDashboardModerator].push("getPostingHistory");
        employerDashboardFunctionsForPostingByRole[localDashboardModerator].push("addJobPosting");

        employerDashboardFunctionsForPostingByRole[jobCryptAdminRole].push("notifyChangeOfAddress");


        // Job seeker dashboard
        jobSeekerDashboardFunctionsForPostingByRole[localDashboardViewer].push("getAppliedJobs");

        jobSeekerDashboardFunctionsForPostingByRole[localDashboardEditor].push("removeAppliedJob");
                        
        jobSeekerDashboardFunctionsForPostingByRole[localDashboardModerator].push("addJobApplication");

        jobSeekerDashboardFunctionsForPostingByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        
        // job posting
        jobPostingFunctionsForPostingByRole[localViewerRole].push("populatePosting");

        jobPostingFunctionsForPostingByRole[localEditorRole].push("populatePosting");
        jobPostingFunctionsForPostingByRole[localEditorRole].push("executePostingAction");
        jobPostingFunctionsForPostingByRole[localEditorRole].push("post"); 
        jobPostingFunctionsForPostingByRole[localEditorRole].push("getFeatureSTR");

        jobPostingFunctionsForPostingByRole[jobCryptAdminRole].push("setExpiryDate");        

        jobPostingFunctionsForPostingByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        jobPostingFunctionsForPostingByRole[jobCryptAdminRole].push("deactivate");

        jobPostingFunctionsForPostingByRole[localBarredApplicantRole].push("applyForJob");

        return true; 
    }

}