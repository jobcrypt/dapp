// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title IJobPosting
 * @dev IJobPosting is responsible for managing and displaying Job listings in the JobCrypt dApp
 */
interface IJobPosting { 

   struct Applicant { 
        address applicant;
        uint256 id; 
        uint256 applicationDate; 
        string link; 
    }


    enum PostStatus {DRAFT, POSTED, FILLED, CANCELLED, EXPIRED, EXTENDED, DEACTIVATED, BARRED, ARCHIVED}
  
    // categorfies, skills, searchterms
    function getFeatureSTRARRAY(string memory _featureName) view external returns (string [] memory _featureValues);

    // title, company name, company description ipfs hash, job description ipfs hash, 
    // location, work type, payment type, location type, location support, company link 
    function getFeatureSTR(string memory _featureName) view external returns (string memory _featureValue);

    // expiry date, posting date, applicant count 
    function getFeatureUINT(string memory _featureName) view external returns (uint256 _featureValue);

    // owner, product
    function getFeatureADDRESS(string memory _featureName) view external returns (address _featureValue);

    function getStatus() view external returns (PostStatus _status);

    function applyForJob() external returns (string memory _applicationURL);

    function getApplicantData(address _applicantAddress) view external returns (Applicant memory _applicant);   

}