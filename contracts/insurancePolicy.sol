// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUniswapV3Pool {
    function slot0() external view returns (
        uint160 sqrtPriceX96,
        int24 tick,
        uint16 observationIndex,
        uint16 observationCardinality,
        uint16 observationCardinalityNext,
        uint8 feeProtocol,
        bool unlocked
    );
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
        uint256 premium;
        uint256 fundsCommitted;
        address denomination;
        address[] acceptedTokens;
        address creator;
        mapping(address => uint256) userFundsCommitted; // Track funds committed per user
    }

    mapping(uint256 => InsurancePolicy) public insurancePolicies;
    uint256 public nextPolicyId;
    IUniswapV3Pool public uniswapPool;

    constructor(address _uniswapPool) {
        uniswapPool = IUniswapV3Pool(_uniswapPool);
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
        policy.denomination = _denomination;
        policy.acceptedTokens = _acceptedTokens;
        policy.creator = msg.sender;
    }

    function commitFunds(uint256 policyId, address token, uint256 amount) public {
        require(policyId < nextPolicyId, "Invalid policy ID");
        InsurancePolicy storage policy = insurancePolicies[policyId];
        require(policy.fundsCommitted + amount <= policy.limit, "Limit exceeded");

        uint256 tokenValueInDenomination = getTokenValueInDenomination(token, amount, policy.denomination);
        policy.fundsCommitted += tokenValueInDenomination;
        policy.userFundsCommitted[msg.sender] += tokenValueInDenomination; // Track user's committed funds
    }

    function getTokenValueInDenomination(address token, uint256 amount, address denomination) private view returns (uint256) {
        (uint160 sqrtPriceX96,,,,,,) = uniswapPool.slot0();
        uint256 price = uint256(sqrtPriceX96) * uint256(sqrtPriceX96) >> 96;
        return amount * price;
    }

    function getAllPolicies() public view returns (InsurancePolicy[] memory) {
        InsurancePolicy[] memory policies = new InsurancePolicy[](nextPolicyId);
        for (uint256 i = 0; i < nextPolicyId; i++) {
            policies[i] = insurancePolicies[i];
        }
        return policies;
    }

}
