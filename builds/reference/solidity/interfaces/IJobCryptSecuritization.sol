// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IJobCryptSecuritization { 

    function secureEmployerDashboard(address _dashboard, address _dashboardOwner) external returns (bool _secured);

    function secureJobSeekerDashboard(address _dashboard, address _dashboardOwner) external returns (bool _secured);

    function secureJobPosting(address _jobPosting, address _dashboardOwner) external returns (bool _secured);
}