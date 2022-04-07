const iJCEmployerDashboardAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_jobPostingAddress",
				"type": "address"
			}
		],
		"name": "addJobPosting",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_added",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endDate",
				"type": "uint256"
			}
		],
		"name": "findPostedJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_postedJobs",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDraftPostings",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_jobPostings",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPostedJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_jobPosting",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPostings",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_jobPostings",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]