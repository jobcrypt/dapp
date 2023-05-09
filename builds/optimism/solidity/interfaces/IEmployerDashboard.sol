// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

/**
 * @author Tony Ushe - JobCrypt
 * @title IEmployerDashboard
 * @dev 
 */

interface IEmployerDashboard {

    function addJobPosting(address _jobPostingAddress ) external returns (bool _added);

    function getPostings() view external returns (address [] memory _jobPostings);

    function getPostedJobs() view external returns (address[] memory _jobPosting);

    function getDraftPostings() view external returns (address [] memory _jobPostings);

    function findPostings(uint256 _startDate, uint256 _endDate) view external returns (address [] memory _postings);    

}