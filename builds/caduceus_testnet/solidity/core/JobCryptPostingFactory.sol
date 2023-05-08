// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
 
 import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";    
 import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
 import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

 import "../interfaces/IJobCryptPostingFactory.sol";
 import "../interfaces/IJobCryptSecuritization.sol";
 import "../interfaces/IJobCryptDashboardFactory.sol";
 import "../interfaces/IJobPostingInstantiator.sol";

 import "../interfaces/IEmployerDashboard.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobCryptPostingFactory
 * @dev 
 */
contract JobCryptPostingFactory is OpenRolesSecureCore, IOpenVersion, IOpenRolesManaged, IJobCryptPostingFactory {

    using LOpenUtilities for string;
    
    string name                         = "RESERVED_JOBCRYPT_JOB_POSTING_FACTORY"; 
    uint256 version                     = 16;

    string jobCryptFacadeRole           = "JOBCRYPT_FACADE_ROLE";
    string jobCryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";

    string registerCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
    
    string securitizationCA             = "RESERVED_JOBCRYPT_DERIVATIVE_CONTRACT_SECURITIZATION";
    string dashboardFactoryCA           = "RESERVED_JOBCRYPT_DASHBOARD_FACTORY";
    string instantiatorCA               = "RESERVED_JOBCRYPT_POSTING_INSTANTIATOR";

     // JobCrypt dApp Roles 
    string [] roleNames = [jobCryptFacadeRole, jobCryptAdminRole];

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    IOpenRegister registry;  
    IJobCryptSecuritization securitization;  
    IJobCryptDashboardFactory dashboardFactory;  
    IJobPostingInstantiator instantiator;           
    address registryAddress; 
   
    mapping(address=>address[]) postingsByOwner; 
    mapping(address=>bool) hasPostingsByOwner; 

    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT") {      
        registryAddress = _registryAddress;   
        registry = IOpenRegister(_registryAddress); 
        securitization = IJobCryptSecuritization(registry.getAddress(securitizationCA));
        dashboardFactory = IJobCryptDashboardFactory(registry.getAddress(dashboardFactoryCA));
        instantiator = IJobPostingInstantiator(registry.getAddress(instantiatorCA));
        setRoleManager(registry.getAddress(roleManagerCA));

        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(securitization));
        addConfigurationItem(address(dashboardFactory));
        addConfigurationItem(address(instantiator));
        addConfigurationItem(name, self, version);

        initDefaultFunctionsForRoles();         
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

    function getDApp() view external returns (string memory _dApp){
        return dappName; 
    }

    function findPostings(address _postingOwner) override view external returns (address [] memory _postings){
        require(isSecure(jobCryptAdminRole, "findPostings")," admin only ");
        require(hasPostingsByOwner[_postingOwner], " no postings ");
        return  postingsByOwner[_postingOwner];
    }

    function createJobPosting(address _postingOwner, address _product) override external returns (address _jobPostingAddress){   

        require(isSecure(jobCryptFacadeRole, "createJobPosting")," core only ");                      
        _jobPostingAddress = instantiator.getPostingAddress(_postingOwner, _product);        
        postingsByOwner[_postingOwner].push(_jobPostingAddress);
        hasPostingsByOwner[_postingOwner] = true;         
        securitization.secureJobPosting(_jobPostingAddress, _postingOwner);

        return _jobPostingAddress;       
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        securitization          = IJobCryptSecuritization(registry.getAddress(securitizationCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(dashboardFactoryCA));
        instantiator = IJobPostingInstantiator(registry.getAddress(instantiatorCA));

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(securitization));
        addConfigurationItem(address(dashboardFactory));
        addConfigurationItem(address(instantiator));
        return true; 
    }
   //=============================================== Internal =================

  
    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[jobCryptFacadeRole]  = true; 
        defaultFunctionsByRole[jobCryptFacadeRole].push("createJobPosting");

        hasDefaultFunctionsByRole[jobCryptAdminRole]  = true; 
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[jobCryptAdminRole].push("findPostings");
    }

}