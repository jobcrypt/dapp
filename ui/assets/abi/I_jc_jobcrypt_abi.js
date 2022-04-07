const iJCJobCryptAbi = [{
        "inputs": [{
            "internalType": "address[]",
            "name": "_delistPostings",
            "type": "address[]"
        }],
        "name": "forceDelist",
        "outputs": [{
            "internalType": "uint256",
            "name": "_delistedCount",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_registryAddress",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
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
        "inputs": [{
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
        "inputs": [{
                "internalType": "address",
                "name": "_jobApplicantAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_postingAddress",
                "type": "address"
            }
        ],
        "name": "logJobApplication",
        "outputs": [{
            "internalType": "bool",
            "name": "_logged",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "notifyChangeOfAddress",
        "outputs": [{
            "internalType": "bool",
            "name": "_recieved",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_jobPosting",
            "type": "address"
        }],
        "name": "notifyDelistJob",
        "outputs": [{
            "internalType": "bool",
            "name": "_delisted",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_posting",
            "type": "address"
        }],
        "name": "notifyPayment",
        "outputs": [{
            "internalType": "bool",
            "name": "_recieved",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "bool",
            "name": "_recieved",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "bool",
            "name": "_recieved",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_jobPostingAddress",
            "type": "address"
        }],
        "name": "postJob",
        "outputs": [{
            "internalType": "bool",
            "name": "_posted",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address[]",
            "name": "_migratedJobPostings",
            "type": "address[]"
        }],
        "name": "postMigratedJobs",
        "outputs": [{
                "internalType": "uint256",
                "name": "_migratedJobCount",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "_notMigrated",
                "type": "address[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pruneJobs",
        "outputs": [{
                "internalType": "uint256",
                "name": "_latestPruneCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_featuredPruneCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_activePruneCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "string",
                "name": "_limitKey",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_limit",
                "type": "uint256"
            }
        ],
        "name": "setLimit",
        "outputs": [{
            "internalType": "bool",
            "name": "_set",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_term",
            "type": "string"
        }],
        "name": "findJobs",
        "outputs": [{
            "internalType": "address[]",
            "name": "_postingAddresses",
            "type": "address[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "address[]",
            "name": "_postAddresses",
            "type": "address[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_page",
            "type": "uint256"
        }],
        "name": "getActiveJobPage",
        "outputs": [{
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
        "inputs": [{
            "internalType": "string",
            "name": "_role",
            "type": "string"
        }],
        "name": "getDefaultFunctions",
        "outputs": [{
            "internalType": "string[]",
            "name": "_functions",
            "type": "string[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDefaultRoles",
        "outputs": [{
            "internalType": "string[]",
            "name": "_roles",
            "type": "string[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFeaturedJobs",
        "outputs": [{
            "internalType": "address[]",
            "name": "_featuredJobAddresses",
            "type": "address[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getHotSearchTerms",
        "outputs": [{
            "internalType": "string[]",
            "name": "_hotSearchTerms",
            "type": "string[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLatestJobs",
        "outputs": [{
            "internalType": "address[]",
            "name": "_latestJobAddresses",
            "type": "address[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getName",
        "outputs": [{
            "internalType": "string",
            "name": "_contractName",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPopularJobs",
        "outputs": [{
            "internalType": "address[]",
            "name": "_popularJobAddresses",
            "type": "address[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVersion",
        "outputs": [{
            "internalType": "uint256",
            "name": "_version",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_role",
            "type": "string"
        }],
        "name": "hasDefaultFunctions",
        "outputs": [{
            "internalType": "bool",
            "name": "_hasFunctions",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_posting",
            "type": "address"
        }],
        "name": "isPaidPosting",
        "outputs": [{
            "internalType": "bool",
            "name": "_paid",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isStaked",
        "outputs": [{
            "internalType": "bool",
            "name": "_staked",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "listConfiguration",
        "outputs": [{
                "internalType": "string[]",
                "name": "_names",
                "type": "string[]"
            },
            {
                "internalType": "address[]",
                "name": "_addresses",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_versions",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]