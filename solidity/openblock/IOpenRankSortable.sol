//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev IOpenSearch is about searching fields to identify addresses of interest.
 */
interface IOpenRankSortable {

    function compare(address _address) view external returns (int _zeroplusorminusone);

    function isEqual(address _address) view external returns (bool _isEqual);

}