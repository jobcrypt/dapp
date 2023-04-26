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
		"inputs": [
			{
				"internalType": "string",
				"name": "_featureName",
				"type": "string"
			}
		],
		"name": "getFeatureADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "_featureValue",
				"type": "address"
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
		"name": "getFeatureSTR",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_featureName",
				"type": "string"
			}
		],
		"name": "getFeatureSTRARRAY",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "_featureValues",
				"type": "string[]"
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
		"name": "getFeatureUINT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_featureValue",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "enum IJobPosting.PostStatus",
				"name": "_status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default iJCJobPostingAbi;