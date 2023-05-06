// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title IJobSeekerDashboard
 * @dev 
 */
interface IJobSeekerDashboard {
    
    function getAppliedJobs() view external returns (address [] memory _appliedJobAddresses);

    function addJobApplication(address _jobPosting) external returns (bool _added);

}