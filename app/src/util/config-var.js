export const insurancePolicyAddress = "0x4dFf164AbE5B75018bA8f5b9f7166aCcc4C12406";

export const insurancePolicyABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_uniswapPool",
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
              "internalType": "address[]",
              "name": "acceptedTokens",
              "type": "address[]"
            }
          ],
          "internalType": "struct InsurancePolicyContract.InsurancePolicy[]",
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
      "inputs": [],
      "name": "uniswapPool",
      "outputs": [
        {
          "internalType": "contract IUniswapV3Pool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  