//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;

interface IOpenProduct {

    function getId() view external returns (uint _id);

    function getName() view external returns (string memory _name);

    function getPrice() view external returns (uint256 _price);

    function getCurrency() view external returns (string memory _currency);

    function getErc20() view external returns (address _erc20);

    function getFeatureUINTValue(string memory _featureName) view external returns (uint256 _value);

    function getFeatureSTRValue(string memory _featureName) view external returns (string memory _value);

    function getFeatureUADDRESSValue(string memory _featureName) view external returns (address _value);

    function getFeatureFee(string memory _featureName) view external returns (uint256 _value);

    function hasFeature(string memory _featureName) view external returns (bool _hasFeature); 
    
    function getFeatureManager(string memory featureName) view external returns (address _featureManager);

}