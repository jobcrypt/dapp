// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.14;

import "../interfaces/IDashboardInstantiator.sol";
import "./DerivativeInstantiator.sol";
import "./JobSeekerDashboard.sol";

contract JobSeekerDashboardInstantiator is DerivativeInstantiator, IDashboardInstantiator {

    constructor(address _registryAddress) DerivativeInstantiator(_registryAddress, "RESERVED_JOBCRYPT_JOBSEEKER_DASHBOARD_INSTANTIATOR", 1, "JOBSEEKER_DASHBOARD_TYPE", "instantiateDashboard"){
    }

    function instantiateDashboard(address _owner) override external returns (address _dashboard){
        require(isSecure(jobCryptFactoryRole, "instantiateDashboard")," jobcrypt factory core only "); 
        _dashboard = address(new JobSeekerDashboard(_owner, address(registry)));
        registry.registerDerivativeAddress(_dashboard, derivativeType);
        instances.push(_dashboard);
        return _dashboard;  
    }
}