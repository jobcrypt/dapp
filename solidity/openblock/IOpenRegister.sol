//SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <0.9.0;

interface  IOpenRegister  { 

    function getDapp() view external returns (string memory _dapp);

    function getAddress(string memory _addressName) view external returns (address _address);    

    function isKnownAddress(address _address) view external returns (bool _isKnown);

    function isDerivativeAddress(address _address) view external returns (bool _isDerivativeAddress);
    
    function getDerivativeAddressType(address _address) view external returns (string memory _type);

    function registerAddress(address _address, string memory _nameOrType) external returns (bool _registered);

    function deregisterAddress(address _address) external returns (bool _deregistered);

    function registerDerivativeAddress( address _address, string memory _type) external returns (bool _registered);

    function deregisterDerivativeAddress(address _address) external returns (bool _deregistered); 

}