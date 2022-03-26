// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

interface IJobCryptPaymentManager { 

    function getPaymentData(uint256 _txRef) view external returns (address _posting, address _product, uint256 _fee, address _erc20, string memory _reference);
    
    function payForPostingFeature(string memory _feature, address _posting) payable external returns ( uint256 _txRef);

    function payForPosting(address _postingAddress) payable external returns (uint256 _txRef);

    function getPaidPostings(address _postingOwner) view external returns (address [] memory _postingAddreses);
    
    function isPaid(address _posting ) view external returns (uint256 _paidOn);
}