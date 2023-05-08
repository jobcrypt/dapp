// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15; 

 import "../interfaces/IJobPostingInstantiator.sol";
 import "./JcJobPosting.sol";
 import "./DerivativeInstantiator.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobPostingInstantiator
 * @dev 
 * ⁜version 6
 */
 contract JobPostingInstantiator is DerivativeInstantiator, IJobPostingInstantiator {   

    constructor(address _registryAddress)  DerivativeInstantiator(_registryAddress, "RESERVED_JOBCRYPT_POSTING_INSTANTIATOR", 6, "JOBCRYPT_JOB_POSTING_TYPE", "getPostingAddress") {             
    }
    function getPostingAddress(address _owner, address _product)  external returns (address _postingAddress) {
        require(isSecure(jobCryptFactoryRole, "getPostingAddress"),"fo"); 
        _postingAddress = address(new JcJobPosting(address(registry), _owner, _product));
        registerDerivativeType(_postingAddress, "JOBCRYPT_JOB_POSTING_TYPE", _owner, "POSTING_OWNER");        
        return _postingAddress; 
    }

 }