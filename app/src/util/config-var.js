
export const tokenizedVaultFactoryAddress = "0xe5FAEC635BD8b313fB37283047537BEB9978AC15";
export const tokenizedVaultFactoryAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vaultId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "vaultAddress",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "vaultAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "underlyingAsset",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "region",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "minPremiumRate",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "denomination",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "poolType",
								"type": "string"
							}
						],
						"internalType": "struct TokenizedVault.InvestmentCriteria",
						"name": "investmentCriteria",
						"type": "tuple"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symbol",
						"type": "string"
					}
				],
				"indexed": false,
				"internalType": "struct TokenizedVaultFactory.VaultParams",
				"name": "params",
				"type": "tuple"
			}
		],
		"name": "VaultCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "underlyingAsset",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "contract IInsurancePolicyContract",
				"name": "insurancePolicyContract",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "minPremiumRate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "denomination",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "poolType",
				"type": "string"
			}
		],
		"name": "createVault",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vaultId",
				"type": "uint256"
			}
		],
		"name": "getVaultDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "vaultAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "underlyingAsset",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "region",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "minPremiumRate",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "denomination",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "poolType",
								"type": "string"
							}
						],
						"internalType": "struct TokenizedVault.InvestmentCriteria",
						"name": "investmentCriteria",
						"type": "tuple"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symbol",
						"type": "string"
					}
				],
				"internalType": "struct TokenizedVaultFactory.VaultParams",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVaults",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vaults",
		"outputs": [
			{
				"internalType": "address",
				"name": "vaultAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "underlyingAsset",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "minPremiumRate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					}
				],
				"internalType": "struct TokenizedVault.InvestmentCriteria",
				"name": "investmentCriteria",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const insurancePolicyAddress = "0xb647C1907C71E7BB467943e1A1C50DB2C06D2af9";

export const insurancePolicyABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_uniswapRouter",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "commitFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractCreator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_region",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "longitude",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "latitude",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "radius",
						"type": "uint256"
					}
				],
				"internalType": "struct InsurancePolicyContract.Location",
				"name": "_location",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "start",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "end",
						"type": "uint256"
					}
				],
				"internalType": "struct InsurancePolicyContract.Period",
				"name": "_coverPeriod",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "_probability",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_poolType",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_requestFundFromUNICEF",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_premium",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_denomination",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_acceptedTokens",
				"type": "address[]"
			}
		],
		"name": "createInsurancePolicy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			}
		],
		"name": "finishPolicy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllFinishedPolicies",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllLivePolicies",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPolicies",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			}
		],
		"name": "getCommittedAmounts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalCommittedInDenomination",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct InsurancePolicyContract.CommittedAmounts[]",
				"name": "tokenAmounts",
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
				"name": "poolType",
				"type": "string"
			}
		],
		"name": "getPoliciesByType",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "getPoliciesForCreator",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getPoliciesForInvestor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
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
				"name": "region",
				"type": "string"
			}
		],
		"name": "getPoliciesForRegion",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoliciesRequestingUnicefFunding",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoliciesWithUnicefFunding",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "policyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "longitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "latitude",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "radius",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "start",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "end",
								"type": "uint256"
							}
						],
						"internalType": "struct InsurancePolicyContract.Period",
						"name": "coverPeriod",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "probability",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poolType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "requestFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "receivedFundFromUNICEF",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "premium",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fundsCommitted",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "denomination",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "acceptedTokens",
						"type": "address[]"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "usersCommitted",
						"type": "address[]"
					}
				],
				"internalType": "struct InsurancePolicyContract.InsurancePolicyView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "insurancePolicies",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "limit",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "longitude",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "latitude",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "radius",
						"type": "uint256"
					}
				],
				"internalType": "struct InsurancePolicyContract.Location",
				"name": "location",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "start",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "end",
						"type": "uint256"
					}
				],
				"internalType": "struct InsurancePolicyContract.Period",
				"name": "coverPeriod",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "probability",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "poolType",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "requestFundFromUNICEF",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "receivedFundFromUNICEF",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "premium",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fundsCommitted",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "denomination",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextPolicyId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "oracleValues",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			}
		],
		"name": "payoutPremium",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			}
		],
		"name": "payoutToCreator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_unicefWallet",
				"type": "address"
			}
		],
		"name": "setUnicefWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "unicefDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unicefWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapRouter",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_value",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "updateOracleValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


export const vaultABI = [
	{
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "_asset",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			},
			{
				"internalType": "contract IInsurancePolicyContract",
				"name": "_insurancePolicyContract",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_region",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_minPremiumRate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_denomination",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_poolType",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsCommitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsReleased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minPremiumRate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "denomination",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "poolType",
				"type": "string"
			}
		],
		"name": "InvestmentCriteriaUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "asset",
		"outputs": [
			{
				"internalType": "contract ERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "assetContract",
		"outputs": [
			{
				"internalType": "contract ERC20",
				"name": "",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "denomination",
				"type": "address"
			}
		],
		"name": "commitFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "convertToAssets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			}
		],
		"name": "convertToShares",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRegionAndPoolType",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "insurancePolicyContract",
		"outputs": [
			{
				"internalType": "contract IInsurancePolicyContract",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "investmentCriteria",
		"outputs": [
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "minPremiumRate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "denomination",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "poolType",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "maxDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "maxMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "owner",
				"type": "address"
			}
		],
		"name": "maxRedeem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "owner",
				"type": "address"
			}
		],
		"name": "maxWithdraw",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
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
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			}
		],
		"name": "previewDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "previewMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "previewRedeem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			}
		],
		"name": "previewWithdraw",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "redeem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "releaseFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalAssets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalAssetsAvailable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalCommittedFunds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
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
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IInsurancePolicyContract",
				"name": "newContract",
				"type": "address"
			}
		],
		"name": "updateInsurancePolicyContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_region",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_minPremiumRate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_denomination",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_poolType",
				"type": "string"
			}
		],
		"name": "updateInvestmentCriteria",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assets",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]