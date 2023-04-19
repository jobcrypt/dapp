const iJCStakeManagerAbi = [
	{
		"inputs": [],
		"name": "getMinimumStakeAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStakeErc20Address",
		"outputs": [
			{
				"internalType": "address",
				"name": "_stakeToken",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStakedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_stakedAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_staker",
				"type": "address"
			}
		],
		"name": "isStaked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_staked",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_staked",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unstake",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_unstakedAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export default iJCStakeManagerAbi;