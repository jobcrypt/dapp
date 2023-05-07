// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/Block-Star-Logic/open-ranking/blob/9b1efaecda444655a94dc9ee1a301ee049f701bf/blockchain_ethereum/solidity/V1/interfaces/IOpenRankSortable.sol"; 
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title IJobCryptSortable
 * @dev IJobCryptSortable is responsible an interface used to help sort Job Postings autonomously 
 */
interface IJobCryptSortable is IOpenRankSortable { 

     function getJobPostingAddress() view external returns (address _address);

}