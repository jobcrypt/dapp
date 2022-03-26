//"SPDX-License-Identifier: APACHE 2.0"
pragma solidity >=0.8.0 <0.9.0;

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";

contract OpenRolesSecure { 

    IOpenRoles roleManager; 
    address self; 

    constructor() { 
        self = address(this);
    }
    
    function setRoleManager(address _openRolesAddress) internal returns (bool _set){
         roleManager = IOpenRoles(_openRolesAddress);
       
         return true; 
    }

    function isSecure(string memory _role, string memory _function) view internal returns (bool) {
       //return roleManager.isAllowed(self, _role, _function, msg.sender);
       return true; 
    }
        
    function isSecureBarring(string memory _role, string memory _function) view internal returns (bool) {
       /*
       if(roleManager.isBarred(self, _role, _function, msg.sender)){
           return false; 
       }*/
       return true; 
    }


}