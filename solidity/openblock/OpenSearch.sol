//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev IOpenSearch is about searching fields to identify addresses of interest.
 */

import "https://github.com/Block-Star-Logic/open-libraries/blob/16a705a5421984ca94dc72fff100cb406ac9aa96/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "./IOpenSearch.sol";

contract OpenSearch is IOpenSearch {

    using LOpenUtilities for uint256;
    using LOpenUtilities for string;
    using LOpenUtilities for address[];

    address [] uniqueAddresses; 
    mapping(address=>bool) knownByAddress; 

    string [] uniqueFields; 

    mapping(string=>mapping(string=>bool)) knownBySTRValueByField; 
    mapping(string=>mapping(string=>address[])) addressesBySTRValueByField; 
    mapping(string=>string[]) STRvaluesByField;     

    mapping(string=>mapping(uint256=>bool)) knownByNUMValueByField; 
    mapping(string=>mapping(uint256=>address[])) addressesByNUMValueByField; 
    mapping(string=>uint256[]) NUMvaluesByField; 

    mapping(string=>mapping(string=>bool)) knownByFieldByType; 

    address roleManager; // @todo add role access

    constructor() {         
    }

    function getSearchableAddressCount() view external returns (uint256 _addressCount) {
        return uniqueAddresses.length; 
    }

    function getSearchableFieldCount() view external returns (uint256 _fieldCount) {
        return uniqueFields.length; 
    }

    function searchFields(string memory _term, string[] memory _fields, uint256 _resultLimit) override view external returns(address[] memory _results){
        _results = new address[](0);
        for(uint256 x = 0; x < _fields.length; x++){
            string memory field_ = _fields[x];
            string [] memory values_ = STRvaluesByField[field_];
            if(_term.isContained(values_)) {
                _results = _results.append(addressesBySTRValueByField[field_][_term]);
                if(_results.length >= _resultLimit)  {
                    return _results;                 
                }
            }   
        }
        return _results; 
    }

    function searchFields(uint256 _value, string memory _comparator, string [] memory _fields, uint256 _resultLimit) override view external returns (address[] memory _results){
        _results = new address[](0);
        for(uint256 x = 0; x < _fields.length; x++){
            string memory field_ = _fields[x];
            uint256 [] memory values_ = NUMvaluesByField[field_];
            for(uint256 y = 0; y < values_.length; y++){            
                uint256 value_ = values_[y];
                if(compareInternal(_value, value_, _comparator)) {                    
                    _results = _results.append(addressesByNUMValueByField[field_][value_]);
                    if(_results.length >= _resultLimit)  {
                        return _results;                 
                    }
                }
            }   
        }
        return _results; 
    }

    function addSearchableAddress(address _address, string [] memory _fields, string[] memory _values, string [] memory _numericFields, uint256 [] memory _numericValues) override external returns (bool _added){
        if(!knownByAddress[_address]){
            uniqueAddresses.push(_address);
            knownByAddress[_address] = true; 
        }
        addSearchableSTRValuesInternal(_address, _fields, _values);
        addSearchableNUMValuesInternal(_address, _numericFields, _numericValues);
        return true; 
    }

    // ============================================= INTERNAL ======================================================

    function compareInternal(uint256 a, uint256 b, string memory _comparator)  pure internal returns (bool _isComparator){
        if(_comparator.isEqual("GREATER_THAN") || _comparator.isEqual(">")){
            return (a > b);
        }

        if(_comparator.isEqual("LESS_THAN") || _comparator.isEqual("<")){
            return (a < b);
        }

        if(_comparator.isEqual("EQUAL_TO") || _comparator.isEqual("==")){
            return (a == b);
        }
        if(_comparator.isEqual("LESS_THAN_OR_EQUAL_TO") || _comparator.isEqual("<=")){
            return (a <= b);
        }
        if(_comparator.isEqual("GREATER_THAN_OR_EQUAL_TO") || _comparator.isEqual(">=")){
            return (a >= b);
        }
        return false; 
    }

    function addSearchableSTRValuesInternal(address _address, string [] memory _fields, string[] memory _values)  internal returns (bool _added) {
        for(uint256 x = 0 ;x < _fields.length; x++){
            string memory field_ = _fields[x];
            if(!knownByFieldByType["STR"][field_] ){
                knownByFieldByType["STR"][field_] = true; 
                uniqueFields.push(field_);
            }
            string memory value_ = _values[x];
            knownBySTRValueByField[field_][value_] = true; 
            addressesBySTRValueByField[field_][value_].push(_address); 
            STRvaluesByField[field_].push(value_);    
        }        
        return true; 
    }

    function addSearchableNUMValuesInternal(address _address, string [] memory _fields, uint256 [] memory _values)  internal returns (bool _added) {
        for(uint256 x = 0; x < _fields.length; x++){
            string memory field_ = _fields[x];
            if(!knownByFieldByType["NUM"][field_] ){
                knownByFieldByType["NUM"][field_] = true; 
                uniqueFields.push(field_);
            }
            uint256 value_ = _values[x];
            knownByNUMValueByField[field_][value_] = true; 
            addressesByNUMValueByField[field_][value_].push(_address); 
            NUMvaluesByField[field_].push(value_); 
        }
         
        return true; 
        
    }

}