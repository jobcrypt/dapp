// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title IJobCryptPostingFactory
 * @dev IJobCryptPostingFactory is responsible for creating and finding postings in the JobCrypt dApp 
 */
interface IJobCryptPostingFactory {

    function createJobPosting(  address _postingOwner, address _productAddress) external returns (address _jobPostingAddress);

    function findPostings(address _postingOwner) view external returns (address [] memory _postings);

}