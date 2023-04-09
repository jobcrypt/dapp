// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IDashboardInstantiator { 

    function instantiateDashboard(address _owner) external returns (address _dashboard);

}