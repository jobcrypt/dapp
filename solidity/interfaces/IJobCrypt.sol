// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

/**
 * @title IJobCrypt
 * @dev this is the main interface for the Jobcrypt site
 */

 interface IJobCrypt {

     event JobPosted(address _postingAddress, string _companyName, uint256 _postedTime ); 

     event JobApplied(address _postingAddress, uint256 _appliedTime, uint256 _applicationCount); 

     function getActiveJobPage(uint256 _page) view external returns (address [] memory _activeJobAddresses, uint256 _pageCount);

     function findJobs(string memory _term) view external returns (address [] memory _postingAddresses);

     function findJobs(string memory _term, string memory _field) view external returns (address [] memory _postAddresses);

     function getLatestJobs() view external returns (address [] memory _latestJobAddresses);

     function getFeaturedJobs() view external returns (address [] memory _featuredJobAddresses );

     function getPopularJobs() view external returns (address [] memory _popularJobAddresses );

     function getHotSearchTerms() view external returns (string [] memory _hotSearchTerms);

     function isPaidPosting(address _posting) view external returns(bool _paid);
     
     function isStaked() view external returns (bool _staked);

     function notifyPayment(address _posting) external returns (bool _recieved);

     function notifyProductPayment(address _posting, address _productAddress ) external returns (bool _recieved);

     function notifyUserStaked(address _user, bool _isStaked) external returns (bool _recieved);

     function notifyDelistJob(address _jobPosting) external returns (bool _delisted);

     function postJob( address _postingAddress ) external returns (bool _possted);

     function logJobApplication(address _jobApplicantAddress, address _jobPostingAddress) external returns (bool _logged);

 }