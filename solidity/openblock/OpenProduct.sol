//"SPDX-License-Identifier: APACHE 2.0"
pragma solidity >=0.8.0 <0.9.0;

import "./IOpenProduct.sol";


contract OpenProduct is IOpenProduct { 

    mapping(string=>address) featureADDRESSValueByFeatureName; 
    mapping(string=>string) featureSTRValueByFeatureName; 
    mapping(string=>uint256) featureUINTValueByFeatureName; 
    mapping(string=>bool) hasFeatureByFeatureName; 
    mapping(string=>address) featureManagerAddressByFeature; 
    mapping(string=>uint256) featureFeeByFeature; 

    string name; 
    uint256 id; 

    string priceKey = "PRODUCT_PRICE";

    struct Price {
        string currency; 
        uint256 value; 
        address erc20; 
    }

    Price price; 

    constructor(uint256 _id, string memory _name, uint256 _priceValue, string memory _priceCurrency, address _priceContract) {
        id = _id;        
        name = _name; 
        setPriceInternal(_priceValue, _priceCurrency, _priceContract);        
    }

    function getId() override view external returns (uint _id){
        return id;
    }

    function getName() override view external returns (string memory _name){
        return name;
    }

    function getPrice() override view external returns (uint256 _price){
        return (price.value);
    }

    function getCurrency() override view external returns (string memory _currency) {
        return price.currency; 
    }

    function getErc20() override view external returns (address _erc20) {
        return price.erc20; 
    }

    function getFeatureFee(string memory _feature) override view external returns (uint256 _fee){
        return featureFeeByFeature[_feature];
    }

    function getFeatureUINTValue(string memory _featureName) override view external returns (uint256 _value){
        return featureUINTValueByFeatureName[_featureName];
    }

    function getFeatureSTRValue(string memory _featureName) override view external returns (string memory _value){
        return featureSTRValueByFeatureName[_featureName];
    }

    function getFeatureUADDRESSValue(string memory _featureName) override view external returns (address _value){
        return featureADDRESSValueByFeatureName[_featureName];
    }

    function hasFeature(string memory _featureName) override view external returns (bool _hasFeature){
        return hasFeatureByFeatureName[_featureName];
    }

    function getFeatureManager(string memory _feature) override view external returns (address _featureManager){
        return featureManagerAddressByFeature[_feature];
    }

    function setFeatureUINTValue(string memory _featureName, uint256 _featureValue)   external returns(bool _set) {        
        return setFeatureUINTValueInternal(_featureName, _featureValue);
    }

    function setFeatureSTRValue(string memory _featureName, string memory _featureValue)   external returns(bool _set) {
        return setFeatureSTRValueInternal(_featureName, _featureValue);
    }

        function setFeatureADDRESSValue(string memory _featureName, address _featureValue)   external returns(bool _set) {
        return setFeatureADDRESSValueInternal(_featureName, _featureValue);
    }

    function removeFeatureUINTValue(string memory _featureName) external returns (bool _removed) {
        delete featureUINTValueByFeatureName[_featureName];
        delete hasFeatureByFeatureName[_featureName];
        return true; 
    }

    function setPrice (uint256 _priceValue, string memory _priceCurrency, address _priceContract) external returns (bool _set) {
        return setPriceInternal(_priceValue, _priceCurrency, _priceContract);        
    }

    function setFeatureFee(string memory _feature, uint256 _fee) external returns (bool _set){
        featureFeeByFeature[_feature] = _fee; 
        return true; 
    }

    function addFeatureManager(string memory _feature, address featureManager) external returns (bool _added) {
        featureManagerAddressByFeature[_feature] = featureManager; 
        return true; 
    }

    function removeFeatureManager(string memory _feature) external returns (bool _removed){
        delete featureManagerAddressByFeature[_feature];
        return true; 
    }

    //=============================================== INTERNAL ==========================================


    function setPriceInternal(uint256 _priceValue, string memory _priceCurrency, address _priceContract) internal returns (bool _set) {
            //@todo add product admin feature 
        price = Price({
                currency : _priceCurrency,
                value : _priceValue, 
                erc20 : _priceContract
        });
        setFeatureUINTValueInternal(priceKey, _priceValue);    
        return true; 
    }

    function setFeatureUINTValueInternal(string memory _name, uint256 _value)  internal returns (bool _set) {
        featureUINTValueByFeatureName[_name] = _value;
        hasFeatureByFeatureName[_name] = true;
        return true; 
    }

    function setFeatureSTRValueInternal(string memory _name, string memory _value)  internal returns (bool _set) {
        featureSTRValueByFeatureName[_name] = _value;
        hasFeatureByFeatureName[_name] = true;
        return true; 
    }

    function setFeatureADDRESSValueInternal(string memory _name, address _value)  internal returns (bool _set) {
        featureADDRESSValueByFeatureName[_name] = _value;
        hasFeatureByFeatureName[_name] = true;
        return true; 
    }

}