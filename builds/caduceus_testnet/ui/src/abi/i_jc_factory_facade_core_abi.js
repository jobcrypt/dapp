export const iJCFactoryFacadeAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_product",
				"type": "address"
			}
		],
		"name": "createJobPosting",
		"outputs": [
			{
				"internalType": "address",
				"name": "_posting",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_dashboardType",
				"type": "string"
			}
		],
		"name": "findDashboard",
		"outputs": [
			{
				"internalType": "address",
				"name": "_dashboard",
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
				"name": "_dashboardType",
				"type": "string"
			}
		],
		"name": "getDashboard",
		"outputs": [
			{
				"internalType": "address",
				"name": "_dashboard",
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
				"name": "_jobSeekerAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			}
		],
		"name": "linkApplicationToJobSeekerDashboard",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_linked",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]