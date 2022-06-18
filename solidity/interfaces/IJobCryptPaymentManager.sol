// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

interface IJobCryptPaymentManager { 

    struct Payment { 
        address payer; 
        address posting; 
        address product; 
        uint256 fee; 
        address erc20; 
        string ref;
        uint256 date; 
    }

    function getMinimumStakeAmount() view external returns (uint256 _amount); 

    function getStakedAmount() view external returns(uint256 _stakedAmount);

    function isStaked(address _staker) view external returns (bool _staked);
     
    function stake(uint256 _amount) payable external returns (bool _staked);

    function unstake() external returns (uint256 _unstakedAmount);

    function getStakeErc20Address() external returns (address _stakeToken);

    function getPaymentData(uint256 _txRef) view external returns (Payment memory _payment);
    
    function getPaidPostings(address _postingOwner) view external returns (address [] memory _postingAddreses);

    function isProductPaidForPosting(address _posting, address _product) view external returns (bool isPaid);

    function getPaymentDate(address _posting) view external returns (uint256 _paymentDate);

    function payForPosting(address _postingAddress) payable external returns (uint256 _txRef);

    function payForProductForPosting(address _postingAddress, address _product) payable external returns (uint256 _txRef);

}