iJCDashboardFactoryAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_employer",
				"type": "address"
			}
		],
		"name": "createEmployerDashboard",
		"outputs": [
			{
				"internalType": "address",
				"name": "_dashboardAddress",
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
				"name": "_jobSeeker",
				"type": "address"
			}
		],
		"name": "createJobSeekerDashboard",
		"outputs": [
			{
				"internalType": "address",
				"name": "_dashboardAddress",
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
				"name": "_user",
				"type": "address"
			},
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
				"name": "_dashboardAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_dashboardType",
				"type": "string"
			}
		],
		"name": "hasDashboard",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_hasDashboard",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]