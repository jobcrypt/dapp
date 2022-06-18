// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

import  "./IJobPosting.sol";

interface IJobPostingEditor { 

    function post() external returns (bool _posted);

    function executePostingAction(IJobPosting.PostStatus _targetStatus) external returns (bool _success);

    // search categories, skills, search terms 
    // title, company name, company description ipfs hash, job description ipfs hash, 
    // location, work type, payment type, location type, location support, company link
    function populatePosting(string [] memory _featureNames, string [] memory _featureValues, string [] memory _categories, string [] memory _skills, string [] memory _searchTerms, string memory _applyLink ) external returns (bool _populated);

}