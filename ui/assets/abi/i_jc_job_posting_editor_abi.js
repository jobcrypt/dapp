const iJCJobPostingEditorAbi = [
	{
		"inputs": [],
		"name": "deactivate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_deactivated",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_featureNames",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_featureValues",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_categories",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_skills",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "_applyLink",
				"type": "string"
			}
		],
		"name": "populatePosting",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_populated",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "post",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_posted",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_applyLink",
				"type": "string"
			}
		],
		"name": "setApplyLink",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_categories",
				"type": "string[]"
			}
		],
		"name": "setCategories",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
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
				"name": "_expiryDate",
				"type": "uint256"
			}
		],
		"name": "setExpiryDate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_featureNames",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_featureValues",
				"type": "string[]"
			}
		],
		"name": "setFeatures",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			}
		],
		"name": "setPostingStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_skills",
				"type": "string[]"
			}
		],
		"name": "setSkillsRequired",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]