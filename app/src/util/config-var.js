export const insurancePolicyAddress = "0x4dFf164AbE5B75018bA8f5b9f7166aCcc4C12406";

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
  