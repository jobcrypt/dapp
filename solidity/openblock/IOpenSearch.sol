//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev IOpenSearch is about searching fields to identify addresses of interest.
 */
interface IOpenSearch {

    function searchFields(string memory _term, string[] memory _fields, uint256 _resultLimit) view external returns(address[] memory _results);

    function searchFields(uint256 _value, string memory _comparator, string [] memory _fields, uint256 _resultLimit) view external returns (address[] memory _results);

    function addSearchableAddress(address _address, string [] memory _fields, string[] memory _values, string [] memory _numericFields, uint256 [] memory _numericValues) external returns (bool _added);

}