// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

/**
 * @title IJobCrypt
 * @dev this is the main interface for the Jobcrypt site
 */

 interface IJobCrypt {

     event JobPosted(address _postingAddress, string _companyName, uint256 _postedTime ); 

     event JobApplied(address _postingAddress, uint256 _appliedTime, uint256 _applicationCount); 

     function getLatestJobs() view external returns (address [] memory _latestJobAddresses);

     function getFeaturedJobs() view external returns (address [] memory _featuredJobAddresses );

     function getPopularJobs() view external returns (address [] memory _popularJobAddresses );

     function getHotSearchTerms() view external returns (string [] memory _hotSearchTerms);
    
     function configureFeature(string memory feature, address _postingAddress) external returns (bool _configured);
     
     function notifyPayment(address _posting) external returns (bool _recieved);

     function postJob( address _postingAddress ) external returns (bool _possted);

     function logJobApplication(address _jobApplicantAddress, address _jobPostingAddress) external returns (bool _logged);

 }