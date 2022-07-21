// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;


interface IJobCryptStakeManager { 


    function getMinimumStakeAmount() view external returns (uint256 _amount); 

    function getStakedAmount() view external returns(uint256 _stakedAmount);

    function isStaked(address _staker) view external returns (bool _staked);
     
    function stake(uint256 _amount) payable external returns (bool _staked);

    function unstake() external returns (uint256 _unstakedAmount);

    function getStakeErc20Address() external returns (address _stakeToken);


}