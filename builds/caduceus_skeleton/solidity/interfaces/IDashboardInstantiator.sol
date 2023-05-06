// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title IDashboardInstantiator
 * @dev this interface creates a contract instance of a user's dashboard. These dashboards can be of different types 
 */
interface IDashboardInstantiator { 
    /**
     * @dev this function is responsible for instantiating a user's dashboard 
     * @param _owner the address of the owner of the instantiated dashboard 
     * @return _dashboard the dashboard that has been instantiated and is owned by the owner
     */
    function instantiateDashboard(address _owner) external returns (address _dashboard);

}