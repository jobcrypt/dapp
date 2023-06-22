// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

import  "./IJobPosting.sol";

interface IJobPostingEditor { 

    function post() external returns (bool _posted);

    function executePostingAction(IJobPosting.PostStatus _targetStatus) external returns (bool _success);

    // title, company name, company description ipfs hash, job description ipfs hash, 
    // location, work type, payment type, location type, location support, company link
    // search categories, skills, search terms
    function populate(string [] memory _featureNames, string [] memory _featureValues, string [] memory _categories, string [] memory _skills, string [] memory _searchTerms ) external returns (bool _populated);
}