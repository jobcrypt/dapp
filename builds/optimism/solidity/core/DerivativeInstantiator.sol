// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
 
 import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";    
 import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
 import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
 import "https://github.com/Block-Star-Logic/open-register/blob/7b680903d8bb0443b9626a137e30a4d6bb1f6e43/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";
 /**
 * @author Tony Ushe - JobCrypt ©2023
 * @title DerivativeInstantiator
 * @dev DerivativeInstantiator 
 * ⁜version 1
 */
 abstract contract DerivativeInstantiator is OpenRolesSecureCore, IOpenRolesManaged, IOpenVersion {

    using LOpenUtilities for string;

    IOpenRegister registry; 

    string name;
    uint256 version; 
    string derivativeType; 

    string instantiationFunction; 

    // register configuration addresses    
    string constant registerCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string constant roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
 
    string constant jobCryptFactoryRole          = "JOBCRYPT_FACTORY_ROLE";
    string constant jobCryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";

    string [] roleNames                 = [jobCryptFactoryRole, jobCryptAdminRole];

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    address [] instances;

    constructor(address _registryAddress, string memory _name, uint256 _version, string memory _derivativeType, string memory _instantiationFunction) OpenRolesSecureCore("JOBCRYPT") {  
        name = _name; 
        version = _version;     
        derivativeType = _derivativeType; 

        registry = IOpenRegister(_registryAddress); 
        setRoleManager(registry.getAddress(roleManagerCA));
        
        instantiationFunction = _instantiationFunction;

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(name, self, version);

        initDefaultFunctionsForRoles();
    }

    function getName() view external returns (string memory _name) {
        return name; 
    }

    function getVersion() view external returns (uint256 _version) {
        return version; 
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

    function getDerivativeType() view external returns (string memory _type) {
        return derivativeType; 
    }

    function getInstanceAddresses() view external returns (address [] memory _instances) {
        require(isSecure(jobCryptAdminRole, "getInstanceAddresses"),"ao"); 
        return instances; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress"),"ao");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));     
        return true; 
    }

    // ============================ INTERNAL =====================================================    

    function registerDerivativeType(address _address, string memory _type, address _owner, string memory _ownerType) internal {
        registry.registerDerivativeAddress(_address, _type);
        registry.registerUserAddress(_owner, _ownerType);
        instances.push(_address);
    }

    function initDefaultFunctionsForRoles() internal {       

        hasDefaultFunctionsByRole[jobCryptFactoryRole]  = true; 
        defaultFunctionsByRole[jobCryptFactoryRole].push(instantiationFunction);

        hasDefaultFunctionsByRole[jobCryptAdminRole]  = true; 
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[jobCryptAdminRole].push("getInstanceAddresses");
    }
 }