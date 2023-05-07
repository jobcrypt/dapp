// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "../interfaces/IDashboardInstantiator.sol";
import "./DerivativeInstantiator.sol";
import "./EmployerDashboard.sol";
 /**
 * @author Tony Ushe - JobCrypt ©2023
 * @title EmployerDashboardInstantiator
 * @dev  
 * ⁜version 4
 */
contract EmployerDashboardInstantiator is DerivativeInstantiator, IDashboardInstantiator {
    
    constructor(address _registryAddress) DerivativeInstantiator(_registryAddress, "RESERVED_JOBCRYPT_EMPLOYER_DASHBOARD_INSTANTIATOR", 4, "EMPLOYER_DASHBOARD_TYPE", "instantiateDashboard"){
    }

    function instantiateDashboard(address _owner) override external returns (address _dashboard){
        require(isSecure(jobCryptFactoryRole, "instantiateDashboard")," jobcrypt factory core only "); 
        _dashboard = address(new EmployerDashboard(_owner, address(registry)));         
        registerDerivativeType(_dashboard, derivativeType, _owner, "EMPLOYER_DASHBOARD_OWNER"); 
        return _dashboard; 
    }
}
