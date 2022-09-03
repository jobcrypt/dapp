// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

/**
 * @title JobSeeker Dashboard
 * @dev 
 */

 
interface IJobSeekerDashboard {
    
    function getAppliedJobs() view external returns (address [] memory _appliedJobAddresses);

    function addJobApplication(address _jobPosting) external returns (bool _added);

}