// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;


interface IJobPostingEditor { 

    function post() external returns (bool _posted);

    function setFeatures(string [] memory _featureNames, string [] memory _featureValues ) external returns (bool _set);

    function setCategories(string [] memory _categories) external returns (bool _set );

    function setSkillsRequired(string [] memory _skills) external returns (bool _set );
  
    function setExpiryDate(uint256 _expiryDate) external returns (bool _set);

    function setPostingStatus(string memory _status) external returns (bool _set);

    function setApplyLink(string memory _applyLink) external returns (bool _set);

    function populatePosting(string [] memory _featureNames, string [] memory _featureValues, string [] memory _categories, string [] memory _skills, string memory _applyLink ) external returns (bool _populated);

}