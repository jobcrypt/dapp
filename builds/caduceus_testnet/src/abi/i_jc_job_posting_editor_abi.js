export const iJCJobPostingEditorAbi = [
	{
		"inputs": [
			{
				"internalType": "enum IJobPosting.PostStatus",
				"name": "_targetStatus",
				"type": "uint8"
			}
		],
		"name": "executePostingAction",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_success",
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
				"internalType": "string[]",
				"name": "_searchTerms",
				"type": "string[]"
			}
		],
		"name": "populate",
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
	}
]