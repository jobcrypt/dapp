const iJCJobCryptAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_appliedTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_applicationCount",
				"type": "uint256"
			}
		],
		"name": "JobApplied",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_companyName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_postedTime",
				"type": "uint256"
			}
		],
		"name": "JobPosted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_term",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_field",
				"type": "string"
			}
		],
		"name": "findJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_postAddresses",
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
				"name": "_page",
				"type": "uint256"
			}
		],
		"name": "getActiveJobPage",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_activeJobAddresses",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "_pageCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeaturedJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_featuredJobAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHotSearchTerms",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "_hotSearchTerms",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatestJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_latestJobAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPopularJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_popularJobAddresses",
				"type": "address[]"
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
		"name": "isPaidPosting",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_paid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isStaked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_staked",
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
				"name": "_jobApplicantAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_jobPostingAddress",
				"type": "address"
			}
		],
		"name": "logJobApplication",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_logged",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_jobPosting",
				"type": "address"
			}
		],
		"name": "notifyDelistJob",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_delisted",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
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
		"name": "notifyPayment",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_recieved",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
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
				"name": "_productAddress",
				"type": "address"
			}
		],
		"name": "notifyProductPayment",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_recieved",
				"type": "bool"
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
				"internalType": "bool",
				"name": "_isStaked",
				"type": "bool"
			}
		],
		"name": "notifyUserStaked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_recieved",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
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
		"name": "postJob",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_possted",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]