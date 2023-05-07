// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - JobCrypt 
 * @title IJobCrypt
 * @dev this is the main interface for the Jobcrypt site
 */

 interface IJobCrypt {

     event JobEvent(address _postingAddress, string _companyName, string _action,  uint256 _postedTime ); 

     event JobApplied(address _postingAddress, uint256 _appliedTime, uint256 _applicationCount); 

     function getActiveJobPage(uint256 _page) view external returns (address [] memory _activeJobAddresses, uint256 _pageCount);

     function findJobs(string memory _term) view external returns (address [] memory _postingAddresses);

     function findJobs(string memory _term, string memory _field) view external returns (address [] memory _postAddresses);

     function getLatestJobs() view external returns (address [] memory _latestJobAddresses);

     function getFeaturedJobs() view external returns (address [] memory _featuredJobAddresses );

     function getHotSearchTerms() view external returns (string [] memory _hotSearchTerms);

     function isPaidPosting(address _posting) view external returns(bool _paid);
     
     function isStaked() view external returns (bool _staked);

     function notifyDelistJob(address _jobPosting) external returns (bool _delisted);

     function postJob( address _postingAddress ) external returns (bool _posted);

     function repostJob( address _postingAddress) external returns (bool _reposted);

     function logJobApplication(address _jobApplicantAddress, address _jobPostingAddress) external returns (bool _logged);

 }