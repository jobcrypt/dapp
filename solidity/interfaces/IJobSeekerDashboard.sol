// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title JobSeeker Dashboard
 * @dev 
 */

 
interface IJobSeekerDashboard {
    
    function getAppliedJobs() view external returns (address [] memory _appliedJobAddresses);

    function addJobApplication(address _jobPosting) external returns (bool _added);

}