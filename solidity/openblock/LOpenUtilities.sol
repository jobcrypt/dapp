//SPDX-License-Identifier: Apache-2.0

pragma solidity >=0.8.0 <0.9.0;


library LOpenUtilities {

    // version 0.3

    // ===================== ADDRESS ============================================================

    function isContained(address a, address [] memory b ) pure internal returns (bool) {
        for(uint256 x = 0; x < b.length; x++){
            if(a == b[x]) {
                return true; 
            }
        }
        return false; 
    }
    
    function append(address [] memory a, address[] memory b) pure internal returns (address [] memory) {
        uint256 total = a.length + b.length; 
        address [] memory c = new address[](total); 
        uint256 y = 0; 
        uint256 z = 0; 
        for(uint256 x = 0; x < total; x++) {
            if(x < a.length) {
                c[x] = a[y];
                y++;
            }
            else { 
                c[x] = b[z];
                z++;
            }
        }
        return c; 
    }

    function remove(address a, address[] memory b) pure internal returns (address [] memory){
        address [] memory c = new address[](b.length-1);
        uint256 y = 0; 
        for(uint256 x = 0; x < b.length; x++) {
            address d = b[x];
            if( a != d){     
                if(y == c.length){ // i.e. element not found
                    return b; 
                }
                c[y] = d; 
                y++;
           
            }
        }
        return c; 
    }

    function insert(address a, uint256 index, address[] memory b) pure internal returns (address [] memory){
        address [] memory c = new address[](b.length+1);
        uint256 y = 0; 
        bool inserted = false; 
        for(uint256 x = 0; x < c.length; x++) {
            if(x == index){
                c[x] = a; 
                inserted = true; 
            }
            else {
                if(inserted) {
                    c[x] = b[y];                 
                }
                else {
                     c[x] = b[x];                     
                }
                y++;
            }            
        }
        return c; 
    }

    function trim(address [] memory a, uint256 limit) pure internal returns (address [] memory){
        address [] memory b = new address[](limit);        
        for(uint256 x = 0; x < limit; x++) {
            b[x] = a[x];            
        }
        return b; 
    }

    // ===================== UINT256 ============================================================

    function isContained(uint256 z, uint256 [] memory y) pure internal returns (bool) {
        
        for(uint x = 0 ; x < y.length; x++){
            if(y[x] == z){
                return true; 
            }
        }
        return false; 
    }

    function remove(uint256 a, uint256[] memory b) pure internal returns (uint256 [] memory){
        uint256 [] memory c = new uint256[](b.length-1);
        uint256 y = 0; 
        for(uint256 x = 0; x < b.length; x++) {
            uint256 d = b[x];
            if( a != d){    
                if(y == c.length){ // i.e. element not found
                    return b; 
                } 
                c[y] = d; 
                y++;
            }
        }
        return c; 
    }

    function insert(uint256 a, uint256 index, uint256[] memory b) pure internal returns (uint256 [] memory){
        uint256 [] memory c = new uint256[](b.length+1);
        uint256 y = 0; 
        bool inserted = false; 
        for(uint256 x = 0; x < c.length; x++) {
            if(x == index){
                c[x] = a; 
                inserted = true; 
            }
            else {
                if(inserted) {
                    c[x] = b[y];                 
                }
                else {
                     c[x] = b[x];                     
                }
                y++;
            }            
        } 
        return c; 
    }

    function trim(uint256 [] memory a, uint256 limit) pure internal returns (uint256 [] memory){
        uint256 [] memory b = new uint256[](limit);        
        for(uint256 x = 0; x < limit; x++) {
            b[x] = a[x];            
        }
        return b; 
    }

    // ===================== STRINGS ============================================================

    function isContained(string memory a, string [] memory b ) pure internal returns (bool) {
        for(uint256 x = 0; x < b.length; x++){
            if(isEqual(a, b[x])) {
                return true; 
            }
        }
        return false; 
    }
    
    function append(string memory a, string memory b) pure internal returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    function remove(string memory a, string [] memory b) pure internal returns (string [] memory){
        string [] memory c = new string[](b.length-1);
        uint256 y = 0; 
        for(uint256 x = 0; x < b.length; x++) {
            string memory d = b[x];
            if(!isEqual(a, d)){
                if(y == c.length){ // i.e. element not found
                    return b; 
                }
                c[y] = d; 
                y++;
            }
        }
        return c; 
    }

    function append(string [] memory a, string[] memory b) pure internal returns (string [] memory) {
        uint256 total = a.length + b.length; 
        string [] memory c = new string[](total); 
        uint256 y = 0; 
        uint256 z = 0; 
        for(uint256 x = 0; x < total; x++) {
            if(x < a.length) {
                c[x] = a[y];
                y++;
            }
            else { 
                c[x] = b[z];
                z++;
            }
        }
        return c; 
    }


    function isEqual(string memory a, string memory b) pure internal returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b)))); 
    }

    function insert(string memory a, uint256 index, string[] memory b) pure internal returns (string [] memory){
        string [] memory c = new string[](b.length+1);
        uint256 y = 0; 
        bool inserted = false; 
        for(uint256 x = 0; x < c.length; x++) {
            if(x == index){
                c[x] = a; 
                inserted = true; 
            }
            else {
                if(inserted) {
                    c[x] = b[y];                 
                }
                else {
                     c[x] = b[x];                     
                }
                y++;
            }            
        } 
        return c; 
    }

    function trim(string [] memory a, uint256 limit) pure internal returns (string [] memory){
        string [] memory b = new string[](limit);        
        for(uint256 x = 0; x < limit; x++) {
            b[x] = a[x];            
        }
        return b; 
    }

}