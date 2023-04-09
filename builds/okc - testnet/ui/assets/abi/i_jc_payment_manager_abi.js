const iJCPaymentManagerAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_postingOwner",
				"type": "address"
			}
		],
		"name": "getPaidPostings",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_postingAddreses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_txRef",
				"type": "uint256"
			}
		],
		"name": "getPaymentData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "payer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "posting",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "product",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "erc20",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ref",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					}
				],
				"internalType": "struct IJobCryptPaymentManager.Payment",
				"name": "_payment",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_posting",
				"type": "address"
			}
		],
		"name": "getPaymentDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_paymentDate",
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
				"name": "_posting",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_product",
				"type": "address"
			}
		],
		"name": "isProductPaidForPosting",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isPaid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			}
		],
		"name": "payForPosting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_txRef",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_product",
				"type": "address"
			}
		],
		"name": "payForProductForPosting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_txRef",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
]