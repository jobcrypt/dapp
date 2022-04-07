// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <0.9.0;

 import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/e7813857f186df0043c84f0cca42478584abe09c/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

 import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/da64281ff9a0be20c800f1c3e61a17bce99fc90d/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesDerivativeAdmin.sol";
 
 import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

 import "../interfaces/IJobCryptPostingFactory.sol";
 import "../interfaces/IJobCryptSecuritization.sol";
 import "../interfaces/IJobCryptDashboardFactory.sol";

 import "./EmployerDashboard.sol";
 import "./JobSeekerDashboard.sol";
 import "./JcJobPosting.sol";


contract JobCryptPostingFactory is OpenRolesSecure, IOpenRolesManaged, IJobCryptPostingFactory {

    using LOpenUtilities for string;
    
    string name                         = "RESERVED_JOBCRYPT_JOB_POSTING_FACTORY"; 
    uint256 version                     = 7; 

    string coreRole                     = "JOBCRYPT_CORE_ROLE"; 

    string jobPostingType               = "JOBCRYPT_JOB_POSTING_TYPE";
    string employerDashboardType        = "EMPLOYER_DASHBOARD_TYPE";

    string registerCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
    
    string securitizationCA             = "RESERVED_JOBCRYPT_DERIVATIVE_CONTRACT_SECURITIZATION";
    string dashboardFactoryCA           = "RESERVED_JOBCRYPT_DASHBOARD_FACTORY";

     // JobCrypt dApp Roles 
    string [] roleNames = [coreRole];

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    IOpenRegister registry;  
    IJobCryptSecuritization securitization;  
    IJobCryptDashboardFactory dashboardFactory;            
    address registryAddress; 
        
    address [] postings; 
    mapping(address=>address[]) postingsByOwner; 
    mapping(address=>bool) hasPostingsByOwner; 

    constructor(address _registryAddress) {      
        registryAddress = _registryAddress;   
        registry = IOpenRegister(_registryAddress); 
        securitization = IJobCryptSecuritization(registry.getAddress(securitizationCA));
        dashboardFactory = IJobCryptDashboardFactory(registry.getAddress(dashboardFactoryCA));
        setRoleManager(registry.getAddress(roleManagerCA));

        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(securitization));
        addConfigurationItem(address(dashboardFactory));
        addConfigurationItem(name, self, version);

        initDefaultFunctionsForRoles();         
    }

    function getVersion() override view external returns (uint256 _version){
        return version; 
    }

    function getName() override view external returns (string memory _contractName){
        return name;
    }

    function getCreatedPostings() view external returns (address [] memory _postings) { 
        return postings; 
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

    function findPostings(address _postingOwner) override view external returns (address [] memory _postings){
        if(hasPostingsByOwner[_postingOwner]){
            return  postingsByOwner[_postingOwner];
        }
        return new address[](0);
    }

    function createJobPosting(address _postingOwner, 
                                address _product) override external returns (address _jobPostingAddress){      
        require(isSecure(coreRole, "createJobPosting"), "jobcrypt core only ");  
         
        JcJobPosting posting_ = new JcJobPosting( registryAddress, _postingOwner, _product); 
        posting_.setPostingStatus("DRAFT");
        
        _jobPostingAddress = address(posting_);       
        postingsByOwner[_postingOwner].push(_jobPostingAddress);
        hasPostingsByOwner[_postingOwner] = true; 
        registry.registerDerivativeAddress(_jobPostingAddress, jobPostingType);
        
        securitization.secureJobPosting(_jobPostingAddress, _postingOwner);
        // post the draft           
        
        IEmployerDashboard dashboard;
        if(dashboardFactory.hasDashboard(_postingOwner, employerDashboardType)){
            dashboard = IEmployerDashboard(dashboardFactory.findDashboard(_postingOwner, employerDashboardType));
        }
        else { 
            dashboard = IEmployerDashboard(dashboardFactory.createEmployerDashboard(_postingOwner));
        }        
        dashboard.addJobPosting(_jobPostingAddress);
        postings.push(_jobPostingAddress);      
        
        return _jobPostingAddress;       
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(coreRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        securitization          = IJobCryptSecuritization(registry.getAddress(securitizationCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(dashboardFactoryCA));

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(securitization));
        addConfigurationItem(address(dashboardFactory));
        return true; 
    }
   //=============================================== Internal =================


  
    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[coreRole]  = true; 
        defaultFunctionsByRole[coreRole].push("createJobPosting");
    }

}