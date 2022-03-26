// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

interface IJobCryptSecuritization { 

    function secureEmployerDashboard(address _dashboard, address _dashboardOwner) external returns (bool _secured);

    function secureJobSeekerDashboard(address _dashboard, address _dashboardOwner) external returns (bool _secured);

    function secureJobPosting(address _jobPosting, address _dashboardOwner) external returns (bool _secured);
}