iJCVSPaymentManagerAbi = [
	{
		"inputs": [],
		"name": "getPayerPayments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "payer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ref",
						"type": "string"
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
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bankingRef",
						"type": "uint256"
					}
				],
				"internalType": "struct VSPaymentTicket[]",
				"name": "_payments",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ref",
				"type": "string"
			}
		],
		"name": "getPaymentTicket",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "payer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ref",
						"type": "string"
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
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bankingRef",
						"type": "uint256"
					}
				],
				"internalType": "struct VSPaymentTicket",
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
				"name": "_payer",
				"type": "address"
			}
		],
		"name": "getPaymentsForPayer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "payer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ref",
						"type": "string"
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
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bankingRef",
						"type": "uint256"
					}
				],
				"internalType": "struct VSPaymentTicket[]",
				"name": "_payments",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_reference",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "isReferenceOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_isOwner",
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
				"name": "erc20",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_product",
				"type": "address"
			}
		],
		"name": "payForVerificationService",
		"outputs": [
			{
				"internalType": "string",
				"name": "_ref",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
]