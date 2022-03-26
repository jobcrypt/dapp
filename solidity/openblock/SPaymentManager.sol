//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;

import "./IOpenPayments.sol";

contract SPaymentManager is IOpenPayments {


    function payForProduct(address _productAddress, uint256 _fee, address _erc20Address) override payable external returns (bool _paid){
        return true;
    }
    
}