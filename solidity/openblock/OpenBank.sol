// "SPDX-License-Identifier: Apache 2.0"
pragma solidity >0.7.0 <=0.9.0;

import "./IOpenBank.sol";
/** 
 * The IBank interface provides a way for a dApp / blockchain business to manage it's funds on chain without sending the funds 
 * to a wallet or keeping them in the operational contract. This interface is for single currency support. 
 * NOTE: currency contract is set once
 */ 
contract OpenBank is IOpenBank { 
    

    function deposit(uint256 _amount, address _erc20Address, string memory _paymentReference) override payable external returns (uint256 _bankBalance, uint256 _depositTime, uint256 _txnRef){

    }
    

    function withdraw(uint256 _amount, string memory _withdrawalReference,  address payable _payoutAddress) override external returns (uint256 _bankBalance, uint256 _withdrawalTime, uint256 _txnRef){

    }

    function getCurrencyContract() override external view returns (address _currencyContract){

    }

    function getDenomination()  external view returns (address _currencyDenomination){

    }

    function findTransaction(uint256 _txRef) override external view returns (string memory _txnType, string memory _txnInitiatorRef, uint256 _txnDate, uint256 _txnAmount, address _txnInitiator, address _txnReciepient, uint256 _txnRef){

    }
    

    function getBankBalance() override external returns (uint256 _balance, uint256 _date){

    }
    
 
 
    
}