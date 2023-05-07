// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol"; 
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "../interfaces/IEmployerDashboard.sol";
import "../interfaces/IJobSeekerDashboard.sol";
import "../interfaces/IJobCryptDashboardFactory.sol";
import "../interfaces/IJobCryptPostingFactory.sol";
import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobCryptFactoryFacade.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobCryptFactoryFacade
 * @dev 
 */
contract JobCryptFactoryFacade is IJobCryptFactoryFacade, OpenRolesSecureCore, IOpenVersion, IOpenRolesManaged { 

    using LOpenUtilities for string;

    uint256 private version             = 8; 

    string private name                 = "RESERVED_JOBCRYPT_FACTORY_FACADE_CORE"; 

    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
    string registryCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string jobSeekerDashboardFactoryCA  = "RESERVED_JOBCRYPT_DASHBOARD_FACTORY";
    string jobPostingFactoryCA          = "RESERVED_JOBCRYPT_JOB_POSTING_FACTORY"; 

    string jobCryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";
    string jobCryptCoreRole             = "JOBCRYPT_CORE_ROLE";
    string barredPublicUserRole         = "BARRED_PUBLIC_USER_ROLE";
    

    string jobSeekerDashboardType       = "JOBSEEKER_DASHBOARD_TYPE";
    string employerDashboardType        = "EMPLOYER_DASHBOARD_TYPE";
    string jobPostingType               = "JOBCRYPT_JOB_POSTING_TYPE";
    string openProductType              = "OPEN_PRODUCT_TYPE";


    string [] roleNames                 = [jobCryptAdminRole, jobCryptCoreRole, barredPublicUserRole]; 

    IOpenRegister registry; 

    IJobCryptDashboardFactory dashboardFactory;   
    IJobCryptPostingFactory postingFactory; 
    
    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT") {

        registry                = IOpenRegister(_registryAddress);        
        setRoleManager(registry.getAddress(roleManagerCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));
        postingFactory       = IJobCryptPostingFactory(registry.getAddress(jobPostingFactoryCA));
        
        addConfigurationItem(address(registry));
        addConfigurationItem(address(dashboardFactory));
        addConfigurationItem(address(postingFactory));
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(name, self, version);
        initJobCryptFunctionsForRoles();
    }


    function getVersion() override view external returns (uint256 _version) { 
        return version;  
    }

    function getName() override view external returns (string memory _contractName){  
        return name;
    }

    function getDefaultRoles() override view external returns (string [] memory _roles){    
        return  roleNames; 
    }

    function hasDefaultFunctions(string memory _role) override view external returns(bool _hasFunctions){
        return hasDefaultFunctionsByRole[_role];
    }

    function getDefaultFunctions(string memory _role) override view external returns (string [] memory _functions){
        return defaultFunctionsByRole[_role];
    }

    function createJobPosting(address _product) external returns (address _posting) {
        require(isSecureBarring(barredPublicUserRole, "createJobPosting")," user barred.");   
        isDerivativeType(_product, openProductType);
        _posting = postingFactory.createJobPosting(msg.sender, _product);
        linkPostingToEmployerDashboard(msg.sender, _posting);
        return _posting; 
    }   

    function findDashboard(string memory _dashboardType) view external returns (address _dashboard) {
        if(dashboardFactory.hasDashboard(msg.sender, _dashboardType)){
            return dashboardFactory.findDashboard(msg.sender, _dashboardType);
        }
        return address(0);
    }

    function getDashboard(string memory _dashboardType) external returns (address _dashboard){
        return getDashboardInternal(msg.sender, _dashboardType);
    }

    function linkApplicationToJobSeekerDashboard(address _jobSeekerAddress, address _postingAddress) external returns (bool _linked){
        require(isSecure(jobCryptCoreRole, "linkApplicationToJobSeekerDashboard"), " jobcrypt core only ");
        isDerivativeType(_postingAddress, jobPostingType);
        IJobSeekerDashboard jsDashboard = IJobSeekerDashboard(getDashboardInternal(_jobSeekerAddress, jobSeekerDashboardType));
        jsDashboard.addJobApplication(_postingAddress); 
        
        return true; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registryCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));
        postingFactory          = IJobCryptPostingFactory(registry.getAddress(jobPostingFactoryCA));

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(dashboardFactory)); 
        addConfigurationItem(address(postingFactory));

        return true; 
    }


    //============================================== INTERNAL ======================================================


    function getDashboardInternal(address _owner, string memory _dashboardType) internal returns (address _dashboard) {
        
        if(dashboardFactory.hasDashboard(_owner, _dashboardType)){
           _dashboard = dashboardFactory.findDashboard(_owner, _dashboardType);
        }
        else { 
            if(_dashboardType.isEqual(jobSeekerDashboardType)){
                _dashboard = dashboardFactory.createJobSeekerDashboard(_owner);  
            }
            if(_dashboardType.isEqual(employerDashboardType)){
                _dashboard = dashboardFactory.createEmployerDashboard(_owner);
            }
        }
        return _dashboard;
    }

    function linkPostingToEmployerDashboard(address _owner, address _jobPosting) internal returns (bool _linked) {

        IEmployerDashboard employerDashboard;        
        if(dashboardFactory.hasDashboard(_owner, employerDashboardType)){
            employerDashboard = IEmployerDashboard(dashboardFactory.findDashboard(_owner, employerDashboardType));
        }
        else { 
            employerDashboard = IEmployerDashboard(dashboardFactory.createEmployerDashboard(_owner));
        }        
        employerDashboard.addJobPosting(_jobPosting);
        return true; 
    }

    function isDerivativeType(address _address, string memory _type) view internal returns (bool) {
        require(registry.isDerivativeAddress(_address) && registry.getDerivativeAddressType(_address).isEqual(_type)," derivative types only ");
        return true; 
    }

    function initJobCryptFunctionsForRoles() internal returns (bool _initiated) {
      
        hasDefaultFunctionsByRole[jobCryptCoreRole] = true; 
        defaultFunctionsByRole[jobCryptCoreRole].push("linkApplicationToJobSeekerDashboard");
       
        hasDefaultFunctionsByRole[barredPublicUserRole] = true; 
        defaultFunctionsByRole[barredPublicUserRole].push("createJobPosting");

        hasDefaultFunctionsByRole[jobCryptAdminRole] = true;         
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
     
        return true; 
    }
}