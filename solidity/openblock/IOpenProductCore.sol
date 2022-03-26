//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;

interface IOpenProductCore {
    
    function getProductIds() view external returns (uint256[] memory _ids);

    function getProducts() view external returns (address [] memory _products);

    function getProduct(uint256 _productId) view external returns (address _productAddress);

    function isVerified(address _product) view external returns (bool _verified);

    function removeProduct(address _productAddress) external returns (bool _removed);
    
    function createProduct(string memory _name, uint256 _price, string memory _currency, address _erc20) external returns (address _productAddress);
}