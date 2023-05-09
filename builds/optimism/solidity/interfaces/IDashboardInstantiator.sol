// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - (JobCrypt) 
 * @title IDashboardInstantiator
 * @dev instantiates dashboards 
 */
interface IDashboardInstantiator { 

    function instantiateDashboard(address _owner) external returns (address _dashboard);

}