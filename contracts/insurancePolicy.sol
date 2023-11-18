// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUniswapV2Router {
    function getAmountsOut(uint256 amountIn, address[] memory path) external view returns (uint256[] memory amounts);
}

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    // Add other necessary ERC20 functions as needed
}

contract InsurancePolicyContract {
    struct Location {
        uint256 longitude;
        uint256 latitude;
        uint256 radius;
    }

    struct Period {
        uint256 start;
        uint256 end;
    }

    struct InsurancePolicy {
        uint256 limit;
        string region;
        Location location;
        Period coverPeriod;
        uint256 probability;
        string poolType;
        bool requestFundFromUNICEF;
        bool receivedFundFromUNICEF;
        uint256 premium;
        uint256 fundsCommitted;
        address denomination;
        bool active;
        address[] acceptedTokens;
        address creator;
        address[] usersCommitted; // Array to store users who have committed funds
        mapping(address => mapping(address => uint256)) userFundsCommitted; // User -> Token -> Amount
    }

    address public unicefWallet; // Address for UNICEF's wallet
    address public contractCreator; // Address of the contract creator

    mapping(uint256 => InsurancePolicy) public insurancePolicies;
    mapping(uint256 => bool) public oracleValues; // Mapping to store oracle values for each policy ID

    uint256 public nextPolicyId;
    IUniswapV2Router public uniswapRouter;

    constructor(address _uniswapRouter) {
        uniswapRouter = IUniswapV2Router(_uniswapRouter);
        contractCreator = msg.sender; // Set contract creator
    }

    modifier onlyCreator() {
        require(msg.sender == creator, "Caller is not the creator");
        _;
    }
    function createInsurancePolicy(
    uint256 _limit,
    string memory _region,
    Location memory _location,
    Period memory _coverPeriod,
    uint256 _probability,
    string memory _poolType,
    bool _requestFundFromUNICEF,
    uint256 _premium,
    address _denomination,
    address[] memory _acceptedTokens
    ) public {
        require(_coverPeriod.end > _coverPeriod.start, "Invalid cover period");
        
        InsurancePolicy storage policy = insurancePolicies[nextPolicyId++];
        policy.limit = _limit;
        policy.region = _region;
        policy.location = _location;
        policy.coverPeriod = _coverPeriod;
        policy.probability = _probability;
        policy.poolType = _poolType;
        policy.requestFundFromUNICEF = _requestFundFromUNICEF;
        policy.premium = _premium;
        policy.active = true;
        policy.denomination = _denomination;
        policy.acceptedTokens = _acceptedTokens;
        policy.creator = msg.sender;
    }

    function commitFunds(uint256 policyId, address token, uint256 amount) public {
        require(policyId < nextPolicyId, "Invalid policy ID");
        InsurancePolicy storage policy = insurancePolicies[policyId];

        uint256 tokenValueInDenomination = getTokenValueInDenomination(token, amount, policy.denomination);
        require(policy.fundsCommitted + tokenValueInDenomination <= policy.limit, "Limit exceeded");

        policy.fundsCommitted += tokenValueInDenomination;
        if (policy.userFundsCommitted[msg.sender][token] == 0) {
            policy.usersCommitted.push(msg.sender); // Add user to the array if not already added
        }
        policy.userFundsCommitted[msg.sender][token] += amount;
    }

    function finishPolicy(uint256 policyId) public {
        InsurancePolicy storage policy = insurancePolicies[policyId];
        require(block.timestamp > policy.coverPeriod.end, "Cover period not ended");
        require(policy.active == true, "Policy already finished");
        if (oracleValue[_id] == true){
            payoutToCreator(policyId);
            policy.active = false;
        } else {
            payoutPremium(policyId);
            policy.active = false;
        }

    }


    function payoutPremium(uint256 policyId) public {
        InsurancePolicy storage policy = insurancePolicies[policyId];
        
        // Check if the policy is active and the oracle condition is not met
        require(block.timestamp > policy.coverPeriod.end, "Policy period has not ended");
        require(!oracleValues[policyId], "Oracle condition has not been met");
        require(policy.fundsCommitted > 0, "No funds committed to the policy");

        uint256 totalCommitted = policy.fundsCommitted;
        for (uint i = 0; i < policy.acceptedTokens.length; i++) {
            address token = policy.acceptedTokens[i];
            for (uint j = 0; j < policy.usersCommitted.length; j++) {
                address user = policy.usersCommitted[j];
                uint256 userContribution = policy.userFundsCommitted[user][token];
                if (userContribution > 0) {
                    uint256 userShare = (policy.premium * userContribution) / totalCommitted;
                    IERC20(token).transfer(user, userShare);
                    // Reset user's committed funds if necessary
                }
            }
        }

        // Reset policy's state if necessary
    }
    function payoutToCreator(uint256 policyId) public {
        require(oracleValues[policyId], "Oracle condition not met for this policy");
        
        InsurancePolicy storage policy = insurancePolicies[policyId];
        for (uint i = 0; i < policy.acceptedTokens.length; i++) {
            address token = policy.acceptedTokens[i];
            for (uint j = 0; j < policy.usersCommitted.length; j++) {
                address user = policy.usersCommitted[j];
                uint256 amount = policy.userFundsCommitted[user][token];
                if (amount > 0) {
                    policy.userFundsCommitted[user][token] = 0;
                    IERC20(token).transferFrom(user, policy.creator, amount);
                }
            }
        }
    }

    function updateOracleValue(bool _value, uint256 _id) public onlyCreator {
        // This function is a placeholder. In a real-world scenario, the oracle value would typically be updated through an external transaction or a Chainlink data feed.
        oracleValue[_id] = _value;
    }

    function setUnicefWallet(address _unicefWallet) public {
        require(msg.sender == contractCreator, "Only the contract creator can set the UNICEF wallet");
        unicefWallet = _unicefWallet;
    }

    function unicefDeposit(uint256 policyId, uint256 amount) public {
        require(msg.sender == unicefWallet, "Only UNICEF can deposit funds");
        require(policyId < nextPolicyId, "Invalid policy ID");

        InsurancePolicy storage policy = insurancePolicies[policyId];
        require(policy.requestFundFromUNICEF, "Policy did not request UNICEF funding");

        policy.receivedFundFromUNICEF = true;
        policy.fundsCommitted += amount; // Assuming amount is already in the correct denomination
        // Handle the actual transfer of funds from UNICEF to the policy
    }

    function getPoliciesRequestingUnicefFunding() public view returns (InsurancePolicy[] memory) {
        uint256 count;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].requestFundFromUNICEF) {
                count++;
            }
        }

        InsurancePolicy[] memory policies = new InsurancePolicy[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].requestFundFromUNICEF) {
                policies[index++] = insurancePolicies[i];
            }
        }
        return policies;
    }

    function getPoliciesWithUnicefFunding() public view returns (InsurancePolicy[] memory) {
        uint256 count;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].receivedFundFromUNICEF) {
                count++;
            }
        }

        InsurancePolicy[] memory policies = new InsurancePolicy[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].receivedFundFromUNICEF) {
                policies[index++] = insurancePolicies[i];
            }
        }
        return policies;
    }

    function getTokenValueInDenomination(address token, uint256 amount, address denomination) private view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = denomination;
        uint256[] memory amounts = uniswapRouter.getAmountsOut(amount, path);
        return amounts[1];
    }

    // ... [Other functions]
}
