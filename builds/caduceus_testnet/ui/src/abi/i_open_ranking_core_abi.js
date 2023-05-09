export const iOpenRankingCoreAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_rankingList",
				"type": "string"
			}
		],
		"name": "addAddressToRank",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_listCount",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_rankingList",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			}
		],
		"name": "getRanking",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_rankedAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removeRankedAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_removed",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]