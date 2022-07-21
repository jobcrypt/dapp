const iJCJobSeekerDashboardAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_jobPosting",
				"type": "address"
			}
		],
		"name": "addJobApplication",
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
		"inputs": [],
		"name": "getAppliedJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_appliedJobAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]