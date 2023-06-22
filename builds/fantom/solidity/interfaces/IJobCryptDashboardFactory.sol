// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @dev IOpenRanking is about ranking addresses of interest. 
 */
interface IJobCryptDashboardFactory {

    function createEmployerDashboard(address _employer) external returns (address _dashboardAddress);

    function createJobSeekerDashboard(address _jobSeeker) external returns (address _dashboardAddress);

    function hasDashboard(address _user, string memory _dashboardType) view external returns (bool _hasDashboard);

    function findDashboard(address _user, string memory _dashboardType) view external returns (address _dashboardAddress);
}