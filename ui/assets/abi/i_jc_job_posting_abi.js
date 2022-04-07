const iJCJobPostingAbi = [
	{
		"inputs": [],
		"name": "applyForJob",
		"outputs": [
			{
				"internalType": "string",
				"name": "_applicationURL",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getApplicantCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_applicantCount",
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
				"name": "_applicantAddress",
				"type": "address"
			}
		],
		"name": "getApplicantData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "applicant",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "applicationDate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "link",
						"type": "string"
					}
				],
				"internalType": "struct IJobPosting.Applicant",
				"name": "_applicant",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getApplyLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "_applyLink",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCategories",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "_categories",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getExpiryDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_expiryDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_featureName",
				"type": "string"
			}
		],
		"name": "getFeature",
		"outputs": [
			{
				"internalType": "string",
				"name": "_featureValue",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_erc20Currency",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_erc20Address",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPostingDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_postingDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPostingStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "_postingStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProduct",
		"outputs": [
			{
				"internalType": "address",
				"name": "_product",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSkillsRequired",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "_skills",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]