//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev IOpenRanking is about ranking addresses of interest. 
 */
interface IOpenRanking {

    function addAddressToRank(address _address, string memory _rankingList) external returns (uint256 _listCount);

    function getRanking(string memory _rankingList, uint256 _limit) view external returns (address[] memory _rankedAddresses);

}