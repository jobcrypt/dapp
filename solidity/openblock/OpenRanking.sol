//SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev IOpenRanking is about ranking addresses of interest. 
 */

import "./IOpenRanking.sol";
import "./LRankingUtilities.sol";


contract OpenRanking is IOpenRanking {

    using LRankingUtilities for address;

    mapping(string=>address[]) rankedAddressesByListName; 

    constructor() {
        
    }

    function addAddressToRank(address _address, string memory _rankingListName) override external returns (uint256 _listCount){
        address [] memory _list = rankedAddressesByListName[_rankingListName];
        rankedAddressesByListName[_rankingListName] = _address.rank(_list);
        return rankedAddressesByListName[_rankingListName].length; 
    }

    function getRanking(string memory _rankingListName, uint256 _limit) override view external returns (address[] memory _rankedAddresses){
        uint256 size_ = rankedAddressesByListName[_rankingListName].length;
        if(size_ < _limit) {
            return rankedAddressesByListName[_rankingListName];
        }
        _rankedAddresses = new address[](_limit);
          address [] memory list_ = rankedAddressesByListName[_rankingListName];
        for(uint256 x = 0; x < _limit; x++){
            _rankedAddresses[x] = list_[x];
        }
        return _rankedAddresses; 
    }

}