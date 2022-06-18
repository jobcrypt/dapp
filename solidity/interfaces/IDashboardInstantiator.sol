// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.7.0 <0.9.0;

interface IDashboardInstantiator { 

    function instantiateDashboard(address _owner) external returns (address _dashboard);

}