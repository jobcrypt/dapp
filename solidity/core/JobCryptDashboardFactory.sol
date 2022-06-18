// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.14;
/**
 * @dev 
 */

 import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
 
 import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/da64281ff9a0be20c800f1c3e61a17bce99fc90d/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativeAdmin.sol";

 import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";


 import "../interfaces/IJobCryptDashboardFactory.sol";
 import "../interfaces/IJobCryptSecuritization.sol";
 import "../interfaces/IEmployerDashboard.sol";
 import "../interfaces/IJobPosting.sol";

 import "../interfaces/IDashboardInstantiator.sol";


contract JobCryptDashboardFactory is OpenRolesSecureCore, IOpenVersion, IOpenRolesManaged, IJobCryptDashboardFactory {

    using LOpenUtilities for string;
    
    string name                         = "RESERVED_JOBCRYPT_DASHBOARD_FACTORY"; 
    uint256 version                     = 6;     

    string jobCryptCoreRole             = "JOBCRYPT_CORE_ROLE"; 
    string jobcryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";

    // JobCrypt dApp Roles 
    string [] roleNames = [jobCryptCoreRole, jobcryptAdminRole];

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    string employerDashboardType        = "EMPLOYER_DASHBOARD_TYPE";
    string jobSeekerDashboardType       = "JOBSEEKER_DASHBOARD_TYPE";

    string registerCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";

    string employerInstantiatorCA       = "RESERVED_JOBCRYPT_EMPLOYER_DASHBOARD_INSTANTIATOR";
    string jobSeekerInstantiatorCA      = "RESERVED_JOBCRYPT_JOBSEEKER_DASHBOARD_INSTANTIATOR";
    
    string securitizationCA             = "RESERVED_JOBCRYPT_DERIVATIVE_CONTRACT_SECURITIZATION";

    address [] employerDashboards; 
    address [] jobSeekerDashboards; 

    IOpenRegister registry;  
    IJobCryptSecuritization securitization; 
    IDashboardInstantiator employerInstantiator; 
    IDashboardInstantiator jobSeekerInstantiator;             
    
    mapping(address=>bool) hasEmployerDashboardByEmployerAddress;
    mapping(address=>bool) hasJobSeekreDashboardByJobSeekerAddress;

    mapping(address=>address) employerDashboardByEmployer; 
    mapping(address=>address) jobSeekerDashboardByJobSeeker; 

    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT") {      
        registry = IOpenRegister(_registryAddress); 
        securitization = IJobCryptSecuritization(registry.getAddress(securitizationCA));
        setRoleManager(registry.getAddress(roleManagerCA));
        
        employerInstantiator = IDashboardInstantiator((registry.getAddress(employerInstantiatorCA)));
        jobSeekerInstantiator = IDashboardInstantiator((registry.getAddress(jobSeekerInstantiatorCA)));

        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(securitization));  
        addConfigurationItem(address(employerInstantiator));
        addConfigurationItem(address(jobSeekerInstantiator));  
        addConfigurationItem(name, self, version);

        initDefaultFunctionsForRoles();         
    }

    function getVersion() override view external returns (uint256 _version){
        return version; 
    }

    function getName() override view external returns (string memory _contractName){
        return name;
    }

    function getCreatedEmployerDashboards() view external returns (address [] memory _employerDashboards) { 
        return employerDashboards;         
    }

    function getCreatedJobSeekersDashboards() view external returns (address [] memory _jobSeekerDashboards) { 
        return jobSeekerDashboards;
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

    function getDApp() view external returns (string memory _dApp){
        return registry.getDapp(); 
    }

    function linkToEmployerDashboard(address _jobPosting) external returns (bool _linked){
        require(isSecure(jobCryptCoreRole, "linkToEmployerDashboard"), "jobcrypt core only ");
        require(registry.isDerivativeAddress(_jobPosting), " unknown derivative address ");
        IEmployerDashboard employerDashboard = IEmployerDashboard(findOrCreateDashboard(IJobPosting(_jobPosting).getFeatureADDRESS("OWNER_FEATURE"), employerDashboardType));
        employerDashboard.addJobPosting(_jobPosting);
        return true; 
    }

    function hasDashboard(address _user, string memory _dashboardType) override view external returns (bool _hasDashboard) {
        if(_dashboardType.isEqual(employerDashboardType)){
            return hasEmployerDashboardByEmployerAddress[_user];
        }
        if(_dashboardType.isEqual(jobSeekerDashboardType)){
            return hasJobSeekreDashboardByJobSeekerAddress[_user];
        }
        return false; 
    }

    function findDashboard(address _user, string memory _dashboardType) override view external returns (address _dashboard) {
        require(isSecure(jobCryptCoreRole, "findDashboard"), "jobcrypt core only ");
        return findDashboardInternal(_user, _dashboardType);
    }

    function createEmployerDashboard(address _employer) override external returns (address _dashboardAddress){
        require(isSecure(jobCryptCoreRole, "createEmployerDashboard"), "jobcrypt core only ");
        address dashboard_ = createEmployerDashboardInternal(_employer);
        securitization.secureEmployerDashboard(dashboard_, _employer);
        
        return dashboard_; 
    }

    function createJobSeekerDashboard(address _jobSeeker) override external returns (address _dashboardAddress){
        require(isSecure(jobCryptCoreRole, "createJobSeekerDashboard"), "jobcrypt core only ");
        address dashboard_ = createJobSeekerDashboardInternal(_jobSeeker);
        securitization.secureJobSeekerDashboard(dashboard_, _jobSeeker);
        
        return dashboard_;
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobcryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        securitization          = IJobCryptSecuritization(registry.getAddress(securitizationCA));

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(securitization));  
        return true; 
    }
   //=============================================== Internal =================

    function createJobSeekerDashboardInternal(address _jobSeeker) internal returns(address _dashboardAddress ){
        
        _dashboardAddress = jobSeekerInstantiator.instantiateDashboard(_jobSeeker);
        jobSeekerDashboardByJobSeeker[_jobSeeker] = _dashboardAddress; 
        jobSeekerDashboards.push(_dashboardAddress);
        hasJobSeekreDashboardByJobSeekerAddress[_jobSeeker] = true; 
        registry.registerDerivativeAddress(_dashboardAddress, jobSeekerDashboardType);  
        return _dashboardAddress;
    }

    function createEmployerDashboardInternal(address _employer) internal returns (address _dashboardAddress) {

        _dashboardAddress = employerInstantiator.instantiateDashboard(_employer);    
        employerDashboardByEmployer[_employer] = _dashboardAddress;
        employerDashboards.push(_dashboardAddress);
        hasEmployerDashboardByEmployerAddress[_employer] = true;    
        registry.registerDerivativeAddress(_dashboardAddress, employerDashboardType);    
        return _dashboardAddress; 
    }
    
    function findDashboardInternal(address _userAddress, string memory _dashboardType ) view internal returns (address _dashboard){
        if(_dashboardType.isEqual(employerDashboardType) && hasEmployerDashboardByEmployerAddress[_userAddress]) {
            return employerDashboardByEmployer[_userAddress];
        }

        if (_dashboardType.isEqual(jobSeekerDashboardType) && hasJobSeekreDashboardByJobSeekerAddress[_userAddress]){
            return jobSeekerDashboardByJobSeeker[_userAddress];
        }      
        return address(0);
    }


    function findOrCreateDashboard(address _userAddress, string memory _dashboardType )internal returns (address _dashboard){
        _dashboard = findDashboardInternal(_userAddress, _dashboardType);
        if(_dashboard == address(0)) {
            if(_dashboardType.isEqual(employerDashboardType)){
                _dashboard = createEmployerDashboardInternal(_userAddress); 
                hasEmployerDashboardByEmployerAddress[_userAddress] = true; 
            }

            if(_dashboardType.isEqual(jobSeekerDashboardType)){
                _dashboard = createJobSeekerDashboardInternal(_userAddress);
                hasJobSeekreDashboardByJobSeekerAddress[_userAddress] = true;
            }
        }
        return _dashboard; 
    }

    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[jobCryptCoreRole]  = true; 
        defaultFunctionsByRole[jobCryptCoreRole].push("createJobSeekerDashboard");
        defaultFunctionsByRole[jobCryptCoreRole].push("createEmployerDashboard");
        defaultFunctionsByRole[jobCryptCoreRole].push("linkToEmployerDashboard");
        defaultFunctionsByRole[jobCryptCoreRole].push("findDashboard");

        hasDefaultFunctionsByRole[jobcryptAdminRole] = true; 
        defaultFunctionsByRole[jobcryptAdminRole].push("notifyChangeOfAddress");
    }

}