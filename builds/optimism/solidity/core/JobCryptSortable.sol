// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";

import "../interfaces/IJobCryptSortable.sol";
import "../interfaces/IJobPosting.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobCryptSortable
 * @dev 
 */
contract JobCryptSortable is IJobCryptSortable, IOpenVersion { 

    string name = "JOBCRYPT_SORTABLE_OPEN_DERIVATIVE";
    uint256 version = 2;
    address postingAddress; 
    string applicantCountFeature = "APPLICANT_COUNT_FEATURE"; 

    constructor(address _jobCryptPostingAddress) {
        postingAddress = _jobCryptPostingAddress; 
    }

    function getName()  view external returns (string memory _name) {
        return name; 
    }

    function getVersion() view external returns (uint256 _version){
        return version; 
    }

    function getJobPostingAddress() view external returns (address _address){
        return postingAddress; 
    }

    function compare(address _address) view external returns (int _zeroplusorminusone){
        IJobPosting posting_ = IJobPosting(IJobCryptSortable(_address).getJobPostingAddress());
        IJobPosting self_ = IJobPosting(postingAddress);    
        uint256 applicantCountExternal_ = posting_.getFeatureUINT(applicantCountFeature);
        uint256 applicantCountSelf_ = self_.getFeatureUINT(applicantCountFeature);
        if(applicantCountExternal_ > applicantCountSelf_) {
            return -1; 
        }
        if(applicantCountExternal_ < applicantCountSelf_) {
            return 1; 
        }
        return 0; 
    }

    function isEqual(address _address) view external returns (bool _isEqual){
        return _address == postingAddress;
    }

}