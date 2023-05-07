// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title VSPaymentTicket
 * @dev VSPaymentTicket represents the payment ticket that is issued to the customer on purchase of a Verification Service product 
 */
struct VSPaymentTicket { 
	address payer; 
	string  ref;         
	address product; 
	uint256 fee; 
	address erc20;        
	uint256 date; 
	uint256 bankingRef; 
}
/**
 * @title IJobCryptVSPaymentManager
 * @dev IJobCryptVSPaymentManager is responsible for managing Verification Service Payments
 */
interface IJobCryptVSPaymentManager { 
 
    function getPayerPayments() view external returns (VSPaymentTicket [] memory _payments);

    function isReferenceOwner(string memory _reference, address _address) view external returns (bool _isOwner);

    function getPaymentsForPayer(address _payer) view external returns (VSPaymentTicket [] memory _payments);

    function getPaymentTicket(string memory _ref) view external returns (VSPaymentTicket memory _payment);            

    function payForVerificationService(address erc20, address _product) payable external returns (string memory _ref);
}