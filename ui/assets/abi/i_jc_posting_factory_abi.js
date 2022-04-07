iJCPostingFactoryAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_postingOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_productAddress",
				"type": "address"
			}
		],
		"name": "createJobPosting",
		"outputs": [
			{
				"internalType": "address",
				"name": "_jobPostingAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_postingOwner",
				"type": "address"
			}
		],
		"name": "findPostings",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_postings",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]