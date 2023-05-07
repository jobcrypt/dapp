// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/93764de97d40c04b150f51b92bf2a448f22fbd1f/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "../interfaces/IJobCryptStakeManager.sol";

/** 
 * @author Tony Ushe - JobCrypt ©2023 
 * @title JobCryptSortable 
 * @dev
 */
contract JobCryptStakeManager is IJobCryptStakeManager, OpenRolesSecureCore, IOpenVersion, IOpenRolesManaged { 


    using LOpenUtilities for string; 
    using LOpenUtilities for address;

    string name                      = "RESERVED_JOBCRYPT_STAKE_MANAGER_CORE";
    uint256 version                  = 4;

    IOpenRegister               registry; 
    
    string registerCA                = "RESERVED_OPEN_REGISTER_CORE";    
    string roleManagerCA             = "RESERVED_OPEN_ROLES_CORE";
    
    string barredPublicUserRole      = "BARRED_PUBLIC_USER_ROLE";    
    string jobCryptBusinessAdminRole = "JOBCRYPT_BUSINESS_ADMIN_ROLE";    
    string jobCryptAdminRole         = "JOBCRYPT_ADMIN_ROLE";
    string jobCryptCoreRole          = "JOBCRYPT_CORE_ROLE";
    string stakeErc20CA              = "JOBCRYPT_STAKE_ERC20_CA";

    string stakeLimitKey             = "STAKE_LIMIT_KEY";

    address NATIVE_CURRENCY = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;    

    string [] defaultRoles          = [barredPublicUserRole, jobCryptCoreRole, jobCryptBusinessAdminRole, jobCryptAdminRole];

    bool NATIVE_STAKING              = false;  

    address stakeErc20Address; 

    mapping(string=>uint256) limitsByName; 
    
    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    address [] stakedUsers; 
    mapping(address=>bool) isStakedByAddress; 
    mapping(address=>uint256) stakeAmountsByAddress; 

   constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT") {
        registry                = IOpenRegister(_registryAddress);
        setRoleManager(registry.getAddress(roleManagerCA));
        stakeErc20Address       = registry.getAddress(stakeErc20CA);
        require(stakeErc20Address != address(0), " stake address not populated ");
        if(stakeErc20Address == NATIVE_CURRENCY){
            NATIVE_STAKING = true; 
        }  

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));  
        addConfigurationItem(stakeErc20CA, stakeErc20Address, 0);

        initLimitDefaults();
        initDefaultFunctionsForRoles();
   }

    function getName() override view external returns (string memory _name) {
        return name; 
    }

    function getVersion() override view external returns (uint256 _version){
        return version; 
    }

    function getDefaultRoles() override view external returns (string [] memory _roles){
        return defaultRoles; 
    }
    function hasDefaultFunctions(string memory _role) override view external returns(bool _hasFunctions){
        return hasDefaultFunctionsByRole[_role];
    }

    function getDefaultFunctions(string memory _role) override view external returns (string [] memory _functions){
        return defaultFunctionsByRole[_role];
    }

    function getStakeErc20Address() override view external returns (address _erc20){
        return stakeErc20Address; 
    }

    function getStakedAmount() override view external returns(uint256 _stakedAmount) {
        return stakeAmountsByAddress[msg.sender]; 
    }

    function stake(uint256 _amount) override payable external returns (bool _staked){
        require(isSecureBarring(barredPublicUserRole, "stake"), " user barred ");
        return stakeInternal(_amount); 
    }

    function isStaked(address _address) override view external returns (bool _staked) {
        require(isSecure(jobCryptAdminRole, "isStaked") ||
                isSecure(jobCryptBusinessAdminRole, "isStaked") || 
                isSecure(jobCryptCoreRole, "isStaked") || 
                msg.sender == _address," admin only ");
        return isStakedByAddress[_address];
    }

    function unstake() override external returns (uint256 _unstakedAmount) {
        return unstakeInternal(msg.sender);
    }

    function getMinimumStakeAmount() override view external returns (uint256 _amount) {
        return limitsByName[stakeLimitKey];
    }

    function getStakedUserCount() view external returns (uint256 _stakedUsers) {
        return stakedUsers.length; 
    }

    function setLimit(string memory _limit, uint256 _amount) external returns (bool _set) {
        require(isSecure(jobCryptAdminRole, "setLimit")," admin only ");
        limitsByName[_limit] = _amount; 
        return true; 
    }

    function notifyChangeOfAddress() external returns(bool _nofified) {
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");
        require(stakedUsers.length == 0, "unstake all users first");
        registry = IOpenRegister(registry.getAddress(registerCA));        

        setRoleManager(registry.getAddress(roleManagerCA));          
        stakeErc20Address       = registry.getAddress(stakeErc20CA); 
        if(stakeErc20Address == NATIVE_CURRENCY){
            NATIVE_STAKING = true; 
        } 
        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(stakeErc20CA, stakeErc20Address, 0);
        return true; 
    }   

    function forceUnstake(uint256 _batchSize) external returns (uint256 _unstakedUserCount, uint256 _stakedUserCount) {   
        require(isSecure(jobCryptAdminRole, "forceUnstake")," admin only ");      
        if(_batchSize == 0) {
            _stakedUserCount = stakedUsers.length; 
        }
        else { 
            _stakedUserCount = _batchSize;
        }
        for(uint256 x = 0; x < _stakedUserCount; x++) {
            address stakedUser = stakedUsers[x];
            unstakeInternal(stakedUser);
            _unstakedUserCount++;
        }
        return (_unstakedUserCount, _stakedUserCount); 
    }

    function forceUnstakeOwner(address _owner) external returns (uint256 _unstakedAmount) {   
        require(isSecure(jobCryptAdminRole, "forceUnstakeOwner") || isSecure(jobCryptBusinessAdminRole, "forceUnstakeOwner")," admin only ");      
        return unstakeInternal(_owner);
    }


    // ============================================== INTERNAL ===========================================

     function stakeInternal(uint256 _amount) internal returns (bool) {        
         address _owner = msg.sender; 
        require(!isStakedByAddress[_owner], " already staked ");
        require(_amount >= limitsByName[stakeLimitKey], " in sufficient stake ");

        if(NATIVE_STAKING) {
            require(msg.value >= _amount, " sent value <-> declared value mis-match ");             
            stakeAmountsByAddress[_owner] = msg.value; 
          
        }
        else {
            IERC20 erc20 = IERC20(stakeErc20Address);
            require(erc20.allowance(_owner, self) >= _amount, " insufficient approval ");
            erc20.transferFrom(_owner, self, _amount);
            stakeAmountsByAddress[_owner] = _amount; 
        }
        stakedUsers.push(_owner);      
        isStakedByAddress[_owner] = true;
        return true; 
    }

    function unstakeInternal(address _owner) internal returns (uint256 _unstakedAmount) {        
        _unstakedAmount = stakeAmountsByAddress[_owner];
        if(isStakedByAddress[_owner] && _unstakedAmount > 0){
            stakeAmountsByAddress[_owner] -= _unstakedAmount;             
            delete isStakedByAddress[_owner];
            stakedUsers = _owner.remove(stakedUsers);
        
            if(NATIVE_STAKING){
                address payable leaver = payable(_owner);
                leaver.transfer(_unstakedAmount);
            }
            else {
                IERC20 erc20_ = IERC20(stakeErc20Address);
                erc20_.transfer(_owner, _unstakedAmount);
            }
        }
        return _unstakedAmount; 
    }


    function initLimitDefaults() internal { 
        limitsByName[stakeLimitKey] = 1000000; 
    }
    
    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[barredPublicUserRole] = true; 
        hasDefaultFunctionsByRole[jobCryptAdminRole]    = true; 
        hasDefaultFunctionsByRole[jobCryptBusinessAdminRole] = true; 
        hasDefaultFunctionsByRole[jobCryptCoreRole] = true; 
             
        defaultFunctionsByRole[jobCryptAdminRole].push("forceUnstake");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceUnstakeOwner");
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");        
        defaultFunctionsByRole[jobCryptAdminRole].push("setLimit");
        defaultFunctionsByRole[jobCryptAdminRole].push("isStaked");

        defaultFunctionsByRole[jobCryptCoreRole].push("isStaked");

        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("forceUnstakeOwner");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("isStaked");

        defaultFunctionsByRole[barredPublicUserRole].push("stake");      
    }
}