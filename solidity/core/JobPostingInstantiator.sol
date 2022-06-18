// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.14; 

 import "../interfaces/IJobPostingInstantiator.sol";
 import "./JcJobPosting.sol";
 import "./DerivativeInstantiator.sol";

 contract JobPostingInstantiator is DerivativeInstantiator, IJobPostingInstantiator {   

    constructor(address _registryAddress)  DerivativeInstantiator(_registryAddress, "RESERVED_JOBCRYPT_POSTING_INSTANTIATOR", 1, "JOBCRYPT_JOB_POSTING_TYPE", "getPostingAddress") {             
    }

    function getPostingAddress(address _owner, address _product)  external returns (address _postingAddress) {
        require(isSecure(jobCryptFactoryRole, "getPostingAddress")," factory only "); 
        _postingAddress = address(new JcJobPosting(address(registry), _owner, _product));
        registerDerivativeType(_postingAddress, "JOBCRYPT_JOB_POSTING_TYPE");
        return _postingAddress; 
    }

 }