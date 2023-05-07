// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "../interfaces/IDashboardInstantiator.sol";
import "./DerivativeInstantiator.sol";
import "./JobSeekerDashboard.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobSeekerDashboardInstantiator
 * @dev 
 * •version 3
 */
contract JobSeekerDashboardInstantiator is DerivativeInstantiator, IDashboardInstantiator {

    constructor(address _registryAddress) DerivativeInstantiator(_registryAddress, "RESERVED_JOBCRYPT_JOBSEEKER_DASHBOARD_INSTANTIATOR", 3, "JOBSEEKER_DASHBOARD_TYPE", "instantiateDashboard"){
    }

    function instantiateDashboard(address _owner) override external returns (address _dashboard){
        require(isSecure(jobCryptFactoryRole, "instantiateDashboard")," jobcrypt factory core only "); 
        _dashboard = address(new JobSeekerDashboard(_owner, address(registry)));
        registerDerivativeType(_dashboard, derivativeType, _owner, "JOBSEEKER_DASHBOARD_OWNER");        
        return _dashboard;  
    }
}