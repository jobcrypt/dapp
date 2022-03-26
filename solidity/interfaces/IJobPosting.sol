// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;


interface IJobPosting { 

    function getOwner() view external returns (address _owner);

    function getCategories() view external returns (string [] memory _categories );

    function getSkillsRequired() view external returns (string [] memory _skills );

    function getFeature(string memory _featureName) view external returns (string memory _featureValue);

    function getPostingDate() view external returns (uint256 _postingDate);

    function getExpiryDate() view external returns (uint256 _expiryDate);

    function getProduct() view external returns (address _product);

    function getPostingStatus() view external returns (string memory _postingStatus);

    function applyForJob() external returns (string memory _applicationURL);

    function getApplyLink() view external returns (string memory _applyLink);

    function getApplicantData(address _applicant) view external returns (uint256 _applicationDate, uint256 _applicantNumber, string memory _applyLink);
        
    function getApplicantCount() view external returns (uint256 _applicantCount);    

    function getFee() view external returns (uint256 _fee, string memory _erc20Currency, address _erc20Address);

}