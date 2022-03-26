// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev IOpenRanking is about ranking addresses of interest. 
 */
interface IJobCryptPostingFactory {

    function createJobPosting(  address _postingOwner, 
                                address _productAddress                                 
                                ) external returns (address _jobPostingAddress);

    function findPostings(address _postingOwner) view external returns (address [] memory _postings);

}