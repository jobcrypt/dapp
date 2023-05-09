// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title IJobCryptPaymentManager
 * @dev IJobCryptPaymentManager is responsible for running all payments for the JobCrypt dApp
 */
interface IJobCryptPaymentManager { 

    struct Payment { 
        address payer; 
        address posting; 
        address product; 
        uint256 fee; 
        address erc20; 
        string ref;
        uint256 date; 
    }

    
    function getPaymentData(uint256 _txRef) view external returns (Payment memory _payment);
    
    function getPaidPostings(address _postingOwner) view external returns (address [] memory _postingAddreses);

    function isProductPaidForPosting(address _posting, address _product) view external returns (bool isPaid);

    function getPaymentDate(address _posting) view external returns (uint256 _paymentDate);

    function payForPosting(address _postingAddress) payable external returns (uint256 _txRef);

    function payForProductForPosting(address _postingAddress, address _product) payable external returns (uint256 _txRef);

}