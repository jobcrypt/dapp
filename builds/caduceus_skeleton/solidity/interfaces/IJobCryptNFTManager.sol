// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title IJobCryptNFTManager
 * @dev 
 */
interface IJobCryptNFTManager { 

    function isRecognised(address _user) view external returns (bool _isRecognised);

    function getRecognizedBy(address _user) view external returns (address [] memory _recognizedNFTContracts);

}