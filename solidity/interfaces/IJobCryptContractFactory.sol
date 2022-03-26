//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev IOpenRanking is about ranking addresses of interest. 
 */
interface IJobCryptContractFactory {

    function createEmployerDashboard(address _employer) external returns (address _dashboardAddress);

    function createJobSeekerDashboard(address _jobSeeker) external returns (address _dashboardAddress);

    function createJobPosting(  address _postingOwner, 
                                address _productAddress                                 
                                ) external returns (address _jobPostingAddress);

    function findDashboard(address _user, string memory _dashboardType) view external returns (address _dashboardAddress);

}