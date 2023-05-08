// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativeTypesAdmin.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativesAdmin.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/7b680903d8bb0443b9626a137e30a4d6bb1f6e43/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "../interfaces/IJobCryptSecuritization.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobCryptSecuritization
 * @dev 
 */
contract JobCryptSecuritization is OpenRolesSecureCore, IOpenVersion, IOpenRolesManaged, IJobCryptSecuritization { 

    using LOpenUtilities for string; 

    IOpenRegister registry; 
    IOpenRolesDerivativeTypesAdmin iordta; 
    IOpenRolesDerivativesAdmin iorda; 

    uint256 version                     = 15;
    string name                         = "RESERVED_JOBCRYPT_DERIVATIVE_CONTRACT_SECURITIZATION"; 

    string registerCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
    string derivativeContractTypesAdminCA = "RESERVED_OPEN_ROLES_DERIVATIVE_TYPES_ADMIN";

    string jobCryptFactoryRole              = "JOBCRYPT_FACTORY_ROLE";
    string jobCryptCoreRole                 = "JOBCRYPT_CORE_ROLE"; 
    string jobCryptDashboardModeratorRole   = "JOBCRYPT_DASHBOARD_MODERATOR_ROLE";
    string jobCryptAdminRole                = "JOBCRYPT_ADMIN_ROLE";

    string localViewerRole              = "LOCAL_POSTING_VIEWER_ROLE";
    string localEditorRole              = "LOCAL_POSTING_EDITOR_ROLE"; 
    string localApplicantRole           = "LOCAL_POSTING_APPLICANT_ROLE"; 
    string localBarredApplicantRole     = "LOCAL_BARRED_APPLICANT_ROLE";

    string [] postingLocalRoles         = [localViewerRole, localEditorRole, localApplicantRole, localBarredApplicantRole];

    string localDashboardEditor         = "LOCAL_DASHBOARD_EDITOR_ROLE";
    string localDashboardViewer         = "LOCAL_DASHBOARD_VIEWER_ROLE";

    string [] dashboardRoles            = [localDashboardEditor, localDashboardViewer];

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
    mapping(string=>string[]) employerDashboardFunctionsForDashboardByRole;
    mapping(string=>string[]) jobSeekerDashboardFunctionsForDashboardByRole;


    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT"){ 
        
        registry = IOpenRegister(_registryAddress);
        
        setRoleManager(registry.getAddress(roleManagerCA));

        iordta = IOpenRolesDerivativeTypesAdmin(registry.getAddress(derivativeContractTypesAdminCA));

        iorda = IOpenRolesDerivativesAdmin(roleManager.getDerivativeContractsAdmin(registry.getDapp()));                   

        addConfigurationItem(_registryAddress);           
        addConfigurationItem(address(roleManager));           
        addConfigurationItem(address(iorda));   
        addConfigurationItem(address(iordta));
        
        addConfigurationItem(name, self, version);
        
        initDefaultFunctionsForRoles();
        initDerivativeContractTypeFunctionsForRoles();        
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


    
    function isContained(string memory _type) view external returns (bool) {
        return _type.isContained(derivativeContractTypes);
    }

    function getTypes() view external returns (string [] memory) {
        return iordta.listDerivativeContractTypes();
    }

    function clean() external returns (bool) {
        require(!derivativeManagementInitialised, "types initialised");
        require(isSecure(jobCryptAdminRole, "clean")," admin only "); 
        string [] memory derivativeContractTypes_ = iordta.listDerivativeContractTypes();
        for(uint256 x = 0; x < derivativeContractTypes_.length; x++) {
            string memory type_ = derivativeContractTypes_[x];
            if(type_.isContained(derivativeContractTypes)){
                string [] memory r = new string[](1);
                r[0] = type_;
                iordta.removeDerivativeContractTypes(r);
            }
        }
        return true; 
    }

    function removeType(string memory _type) external returns (bool) {
        require(isSecure(jobCryptAdminRole, "removeType")," admin only "); 
        string [] memory r = new string[](1);
        r[0] = _type;
        iordta.removeDerivativeContractTypes(r);
        return true; 
    }

    function initializeDerivativeManagement() external returns (bool _derivativeManagementInitialized) {
        require(isSecure(jobCryptAdminRole, "initializeDerivativeManagement")," admin only ");  
        require(!derivativeManagementInitialised, "derivative management initialised ");
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
            return derivativeManagementInitialised = true;             
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        iorda = IOpenRolesDerivativesAdmin(roleManager.getDerivativeContractsAdmin(registry.getDapp()));   
        
        address oldIordtaAddress = address(iordta);
        iordta = IOpenRolesDerivativeTypesAdmin(registry.getAddress(derivativeContractTypesAdminCA));
        if(oldIordtaAddress != address(iordta)){ // derivative types need to be re-initialised
            derivativeManagementInitialised = false;
        }        
        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(iorda));   
        addConfigurationItem(address(iordta));
        return true; 
    }

    function secureEmployerDashboard(address _dashboard, address _dashboardOwner) override external returns (bool _secured) {
        require(isSecure(jobCryptFactoryRole, "secureEmployerDashboard"), "jobcrypt factory only ");  

        iorda.addDerivativeContract(_dashboard, employerDashboardType);        
        
        iorda.addRolesForDerivativeContract(_dashboard, dashboardRoles);

        for(uint x = 0; x < dashboardRoles.length; x++){
            iorda.addFunctionsForRoleForDerivativeContract(_dashboard, dashboardRoles[x], employerDashboardFunctionsForDashboardByRole[dashboardRoles[x]]);
        }

        address [] memory users_ = new address[](1);
        users_[0] = _dashboardOwner;

        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardViewer, users_ );
        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardEditor, users_ );

        return true;
    }

    function secureJobSeekerDashboard(address _dashboard, address _dashboardOwner) override external returns (bool _secured) {
        require(isSecure(jobCryptFactoryRole, "secureJobSeekerDashboard"), "jobcrypt factory only ");  

        iorda.addDerivativeContract(_dashboard, jobSeekerDashboardType);        
        
        iorda.addRolesForDerivativeContract(_dashboard, dashboardRoles);

        for(uint x = 0; x < dashboardRoles.length; x++){
            iorda.addFunctionsForRoleForDerivativeContract(_dashboard, dashboardRoles[x], jobSeekerDashboardFunctionsForDashboardByRole[dashboardRoles[x]]);
        }

        address [] memory users_ = new address[](1);
        users_[0] = _dashboardOwner;

        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardViewer, users_ );
        iorda.addUsersForRoleForDerivativeContract(_dashboard, localDashboardEditor, users_ );
    
        return true;
    }

    function secureJobPosting(address _jobPosting, address _postingOwner) override external returns (bool _secured) {
        require(isSecure(jobCryptFactoryRole, "secureJobPosting"), "jobcrypt factory only ");  
              
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
        defaultFunctionsByRole[jobCryptAdminRole].push("clean");
        defaultFunctionsByRole[jobCryptAdminRole].push("removeType");

        return true; 
    }
    
    function initDerivativeContractTypeFunctionsForRoles() internal returns (bool _initialised) {
        
        rolesByDerivativeContractType[jobPostingType]           = [jobCryptAdminRole]; 
        rolesByDerivativeContractType[employerDashboardType]    = [jobCryptAdminRole, jobCryptFactoryRole,jobCryptCoreRole,jobCryptDashboardModeratorRole];
        rolesByDerivativeContractType[jobSeekerDashboardType]   = [jobCryptAdminRole, jobCryptCoreRole,jobCryptDashboardModeratorRole];
        
        functionsByRoleByDerivativeContractType[jobPostingType][jobCryptAdminRole].push("notifyChangeOfAddress"); 
        functionsByRoleByDerivativeContractType[jobPostingType][jobCryptAdminRole].push("setExpiryDate"); 
        functionsByRoleByDerivativeContractType[jobPostingType][jobCryptAdminRole].push("executePostingAction");         
                    
        functionsByRoleByDerivativeContractType[employerDashboardType][jobCryptAdminRole].push("notifyChangeOfAddress");                                                        
        functionsByRoleByDerivativeContractType[employerDashboardType][jobCryptFactoryRole].push("addJobPosting"); 
        functionsByRoleByDerivativeContractType[employerDashboardType][jobCryptCoreRole].push("addJobPosting"); 
        functionsByRoleByDerivativeContractType[employerDashboardType][jobCryptDashboardModeratorRole].push("addJobPosting"); 
        functionsByRoleByDerivativeContractType[employerDashboardType][jobCryptDashboardModeratorRole].push("getPostingHistory"); 
        
        functionsByRoleByDerivativeContractType[jobSeekerDashboardType][jobCryptAdminRole].push("notifyChangeOfAddress");     
        functionsByRoleByDerivativeContractType[jobSeekerDashboardType][jobCryptFactoryRole].push("addJobApplication"); 
        functionsByRoleByDerivativeContractType[jobSeekerDashboardType][jobCryptDashboardModeratorRole].push("addJobApplication"); 
        functionsByRoleByDerivativeContractType[jobSeekerDashboardType][jobCryptDashboardModeratorRole].push("getApplicationHistory"); 
                
        return true; 
    }

    function initDerivativeFunctionsForRoles() internal returns (bool _initialised) {
        // employer dashboard | dashboard moderation is at the dapp level
        employerDashboardFunctionsForDashboardByRole[localDashboardViewer].push("getPostings");
        employerDashboardFunctionsForDashboardByRole[localDashboardViewer].push("findPostings");
        
        employerDashboardFunctionsForDashboardByRole[localDashboardEditor].push("removePosting");
        employerDashboardFunctionsForDashboardByRole[localDashboardEditor].push("getPostings");
        employerDashboardFunctionsForDashboardByRole[localDashboardEditor].push("findPostings");
        employerDashboardFunctionsForDashboardByRole[localDashboardEditor].push("getDraftPostings");

        // Job seeker dashboard | dashboard moderation is at the dapp level
        jobSeekerDashboardFunctionsForDashboardByRole[localDashboardViewer].push("getAppliedJobs");

        jobSeekerDashboardFunctionsForDashboardByRole[localDashboardEditor].push("removeAppliedJob");                    
        jobSeekerDashboardFunctionsForDashboardByRole[localDashboardEditor].push("getAppliedJobs");                    
        
        // job posting
        jobPostingFunctionsForPostingByRole[localViewerRole].push("getApplicantData");        

        jobPostingFunctionsForPostingByRole[localEditorRole].push("populate");        
        jobPostingFunctionsForPostingByRole[localEditorRole].push("post"); 
        jobPostingFunctionsForPostingByRole[localEditorRole].push("executePostingAction");
        jobPostingFunctionsForPostingByRole[localEditorRole].push("getFeatureSTR");
        jobPostingFunctionsForPostingByRole[localEditorRole].push("applyForJob");

        jobPostingFunctionsForPostingByRole[localBarredApplicantRole].push("applyForJob");

        return true; 
    }

}
