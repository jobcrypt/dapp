// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

/**
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