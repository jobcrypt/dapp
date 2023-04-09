// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;


interface IJobCryptFactoryFacade  { 

    function findDashboard(string memory _dashboardType) view external returns (address _dashboard);

    function linkApplicationToJobSeekerDashboard(address _jobSeekerAddress, address _postingAddress) external returns (bool _linked);

    function createJobPosting( address _product) external returns (address _posting);

    function getDashboard(string memory _dashboardType) external returns (address _dashboard);
}