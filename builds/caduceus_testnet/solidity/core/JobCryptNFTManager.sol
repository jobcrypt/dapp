// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol"; 
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/692d8c85a494f78b83aa4de44dcce4e3e63997d1/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "../interfaces/IJobCryptNFTManager.sol";
/** 
 * @author Tony Ushe - JobCrypt ©2023 
 * @title JobCryptNFTManager
 * @dev
 */
contract JobCryptNFTManager is OpenRolesSecureCore, IOpenVersion, IJobCryptNFTManager, IOpenRolesManaged { 

    using LOpenUtilities for string;
    using LOpenUtilities for string[];
    using LOpenUtilities for address; 
    using LOpenUtilities for address[];

    uint256 constant private version             = 4; 

    string constant private name                 = "RESERVED_JOBCRYPT_NFT_MANAGER_CORE";   

    string constant registryCA                   = "RESERVED_OPEN_REGISTER_CORE";  
    string constant roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";

    string constant jobCryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";
    string constant jobCryptBusinessAdminRole    = "JOBCRYPT_BUSINESS_ADMIN_ROLE";
    string constant jobCryptCoreRole             = "JOBCRYPT_CORE_ROLE";

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    string [] roleNames = [jobCryptAdminRole, jobCryptBusinessAdminRole, jobCryptCoreRole]; 

    IOpenRegister registry; 

    address [] recognizedNFTContracts;
    mapping(address=>bool) isRecognizedNFTContract; 

    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT") {
        registry                = IOpenRegister(_registryAddress);
        setRoleManager(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));     
        initJobCryptFunctionsForRoles();
    }
    function getVersion() override pure external returns (uint256 _version) { 
        return version;  
    }
    
    function getName() override pure external returns (string memory _contractName){  
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

    function isRecognised(address _user) view external returns (bool _isRecognised){
        for(uint256 x = 0; x < recognizedNFTContracts.length; x++){
            IERC721 erc721 = IERC721(recognizedNFTContracts[x]);
            if(erc721.balanceOf(_user) > 0) { 
                return true; 
            }
        }
        return false; 
    }

    function getRecognizedBy(address _user) view external returns (address [] memory _recognizedNFTContracts){
        require(isSecure(jobCryptAdminRole, "getRecognizedBy") 
                || isSecure(jobCryptBusinessAdminRole, "getRecognizedBy")," admin only ");  
                _recognizedNFTContracts = new address[](recognizedNFTContracts.length);
                for(uint256 x = 0; x < recognizedNFTContracts.length; x++){
                    IERC721 erc721_ = IERC721(recognizedNFTContracts[x]);
                    if(erc721_.balanceOf(_user) > 0 ) { 
                         _recognizedNFTContracts[x] = recognizedNFTContracts[x];
                    }
                    else { 
                        _recognizedNFTContracts[x] = address(0);
                    }
                }    
                return _recognizedNFTContracts; 
    }

    function isRecognisedNFTContract(address _nftContract) view external returns (bool _recognized) {
        require(isSecure(jobCryptAdminRole, "isRecognisedNFTContract") 
                || isSecure(jobCryptBusinessAdminRole, "isRecognisedNFTContract")
                || isSecure(jobCryptCoreRole, "isRecognisedNFTContract")," admin only "); 
                return isRecognizedNFTContract[_nftContract];
    }

    function getRecognizedNFTContracts() view external returns (address [] memory _recognisedNFTContracts){
         require(isSecure(jobCryptAdminRole, "getRecognizedNFTContracts") 
                || isSecure(jobCryptBusinessAdminRole, "getRecognizedNFTContracts")," admin only ");  
                return recognizedNFTContracts;
    }


    function addRecognizedNFTContract(address _erc721) external returns (bool _added) {
        require(isSecure(jobCryptAdminRole, "addRecognizedNFTContract") 
                || isSecure(jobCryptBusinessAdminRole, "addRecognizedNFTContract")," admin only "); 
        recognizedNFTContracts.push(_erc721);
        isRecognizedNFTContract[_erc721] = true; 
        return true;  
    }

    function removeRecognizedNFTContract(address _erc721) external returns (bool _removed) {
           require(isSecure(jobCryptAdminRole, "getRecognizedBy") 
                   || isSecure(jobCryptBusinessAdminRole, "getRecognizedBy")," admin only "); 
            recognizedNFTContracts = _erc721.remove(recognizedNFTContracts);    
            delete isRecognizedNFTContract[_erc721];
            _removed = true;   
            return _removed;  
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");  
        registry                = IOpenRegister(registry.getAddress(registryCA));
        setRoleManager(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager)); 
        return true; 
    }


    // ================================= INTERNAL ====================================================

    function initJobCryptFunctionsForRoles() internal returns (bool _initiated) {
      
        hasDefaultFunctionsByRole[jobCryptBusinessAdminRole] = true; 
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getRecognizedBy");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("isRecognisedNFTContract");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("addRecognizedNFTContract");

        hasDefaultFunctionsByRole[jobCryptCoreRole] = true; 
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("isRecognisedNFTContract");

        hasDefaultFunctionsByRole[jobCryptAdminRole] = true;         
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[jobCryptAdminRole].push("getRecognizedBy");
        defaultFunctionsByRole[jobCryptAdminRole].push("getRecognizedNFTContracts");
        defaultFunctionsByRole[jobCryptAdminRole].push("isRecognisedNFTContract");
        defaultFunctionsByRole[jobCryptAdminRole].push("addRecognizedNFTContract");

        return true; 
    }

}