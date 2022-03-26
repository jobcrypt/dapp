//SPDX-License-Identifier: Apache-2.0

pragma solidity >=0.8.0 <0.9.0;

import "./IOpenRankSortable.sol";

library LRankingUtilities { 

    function rank(address a, address [] memory rankingList ) view internal returns (address [] memory _rankedList){
        
        uint256 size = rankingList.length+1;
        _rankedList = new address[](size);

        IOpenRankSortable sortable = IOpenRankSortable(a); 
        uint256 index = rankingList.length; 
        
        // find index        
        for(uint256 x = 0; x < rankingList.length; x++ ) {

            int result = sortable.compare(rankingList[x]);
    
            if(result == 1 ){ // if greater take the position
                index = assignIndex(index, x);
            }
            if(result == 0){ // if equal 
                index = assignIndex(index, x+1); 
            }
            if(result == -1){
                // do nothing 
            }
        }

        bool indexAssigned = false; 
        for(uint256 z = 0; z < _rankedList.length; z++ ) {
            if(z == index){
                _rankedList[z] = a; 
                indexAssigned = true; 
            }
            else {
                if(indexAssigned) {
                    _rankedList[z] = rankingList[z-1];
                }
                else {
                    _rankedList[z] = rankingList[z];
                }
            }
        }
    }

    function assignIndex(uint256 _oldIndex, uint256 _newIndex) pure internal returns (uint256 _assignedIndex){
        if(_oldIndex < _newIndex) {
            return _oldIndex; 
        }
        return _newIndex; 
    }

}