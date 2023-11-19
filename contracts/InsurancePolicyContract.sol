// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUniswapV2Router {
    function getAmountsOut(uint256 amountIn, address[] memory path)
        external
        view
        returns (uint256[] memory amounts);
}

//ITokenizedVault Interface
interface ITokenizedVault {
    // Data structure for investment criteria
    struct InvestmentCriteria {
        string region;
        uint256 minPremiumRate; // Represented as a percentage (e.g., 10% = 1000)
        address denomination;
        string poolType;
    }

    // Function signatures
    function updateInsurancePolicyContract(address newContract) external;
    function totalAssetsAvailable() external view returns (uint256);
    function totalAssets() external view returns (uint256);
    function commitFunds(uint256 policyId, uint256 amount, address denomination) external;
    function releaseFunds(uint256 policyId, uint256 amount) external;
    function updateInvestmentCriteria(string memory region, uint256 minPremiumRate, address denomination, string memory poolType) external;
    function getInvestmentCriteria() external view returns (InvestmentCriteria memory);
    function getRegionAndPoolType() external view returns (string memory, string memory);

    // Events
    event InvestmentCriteriaUpdated(string region, uint256 minPremiumRate, address denomination, string poolType);
    event FundsCommitted(uint256 policyId, uint256 amount);
    event FundsReleased(uint256 policyId, uint256 amount);
}

interface ITokenizedVaultFactory {
    // Struct to hold vault creation parameters
    struct VaultParams {
        address vaultAddress;
        address underlyingAsset;
        ITokenizedVault.InvestmentCriteria investmentCriteria;
        string name;
        string symbol;
    }
    struct InvestmentCriteria {
        string region;
        uint256 minPremiumRate; // Represented as a percentage (e.g., 10% = 1000)
        address denomination;
        string poolType;
    }
    function getVaultDetails(uint256 vaultId)
        external
        view
        returns (VaultParams memory);

    // Public state variable accessor functions
    function vaults(uint256 vaultId) external view returns (VaultParams memory);

    function totalVaults() external view returns (uint256);
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
        mapping(address => uint256) userFundsCommittedDenominated; // User -> Total Amount in Denominated Currency
    }

    ITokenizedVaultFactory public tokenizedVaultFactory;

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
        require(msg.sender == contractCreator, "Caller is not the creator");
        _;
    }

    // Function to set the TokenizedVaultFactory address
    function setTokenizedVaultFactoryAddress(address _factoryAddress)
        public
        onlyCreator
    {
        require(_factoryAddress != address(0), "Invalid factory address");
        tokenizedVaultFactory = ITokenizedVaultFactory(_factoryAddress);
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
        require(_premium > 0, "Premium must be greater than zero");

        // Transfer the premium amount from the policy creator to the contract
        IERC20(_denomination).transferFrom(msg.sender, address(this), _premium);

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


    function commitFundsFromEligibleVaults(uint256 policyId, uint256 vaultId) external onlyCreator {
        // Assume insurancePolicies is a mapping of policyId to InsurancePolicy
        InsurancePolicy storage policy = insurancePolicies[policyId];

        uint256 totalVaults = tokenizedVaultFactory.totalVaults();
        ITokenizedVaultFactory.VaultParams memory vaultParams = tokenizedVaultFactory.getVaultDetails(vaultId);
        ITokenizedVault vault = ITokenizedVault(vaultParams.vaultAddress);
        // ITokenizedVault.InvestmentCriteria memory criteria = vault.InvestmentCriteria;

        vault.commitFunds(policyId,policy.limit,policy.denomination);

            // if (isCriteriaMet(policy, criteria)) {
            //     // Assuming the policy's limit is the amount to commit
            //     vault.commitFunds(policyId, policy.limit);
            // }
    }

    function commitFunds(
        uint256 policyId,
        address token,
        uint256 amount
    ) public {
        require(policyId < nextPolicyId, "Invalid policy ID");
        InsurancePolicy storage policy = insurancePolicies[policyId];

        uint256 tokenValueInDenomination = getTokenValueInDenomination(
            token,
            amount,
            policy.denomination
        );
        require(
            policy.fundsCommitted + tokenValueInDenomination <= policy.limit,
            "Limit exceeded"
        );

        policy.fundsCommitted += tokenValueInDenomination;
        if (policy.userFundsCommitted[msg.sender][token] == 0) {
            policy.usersCommitted.push(msg.sender); // Add user to the array if not already added
        }
        policy.userFundsCommitted[msg.sender][token] += amount;
        policy.userFundsCommittedDenominated[
            msg.sender
        ] += tokenValueInDenomination;
    }

    function finishPolicy(uint256 policyId) public {
        InsurancePolicy storage policy = insurancePolicies[policyId];
        require(
            block.timestamp > policy.coverPeriod.end,
            "Cover period not ended"
        );
        require(policy.active == true, "Policy already finished");
        if (oracleValues[policyId] == true) {
            payoutToCreator(policyId);
            policy.active = false;
        } else {
            payoutPremium(policyId);
            policy.active = false;
        }

        uint256 totalVaults = tokenizedVaultFactory.totalVaults(); // Assumes a public state variable in factory
        for (uint256 i = 0; i < totalVaults; i++) {
            address vaultAddress = tokenizedVaultFactory.vaults(i).vaultAddress;
            ITokenizedVault vault = ITokenizedVault(vaultAddress);
            try vault.releaseFunds(policyId, policy.limit) {
                // Handle success
            } catch {
                // Handle failure or ignore
            }
        }
    }

    function payoutPremium(uint256 policyId) public {
        InsurancePolicy storage policy = insurancePolicies[policyId];

        // Check if the policy is active and the oracle condition is not met
        require(
            block.timestamp > policy.coverPeriod.end,
            "Policy period has not ended"
        );
        require(!oracleValues[policyId], "Oracle condition has not been met");
        require(policy.fundsCommitted > 0, "No funds committed to the policy");

        uint256 totalCommitted = policy.fundsCommitted;

        for (uint256 j = 0; j < policy.usersCommitted.length; j++) {
            address user = policy.usersCommitted[j];
            uint256 userContribution = policy.userFundsCommittedDenominated[
                user
            ];
            if (userContribution > 0) {
                uint256 userShare = (policy.premium * userContribution) /
                    totalCommitted;
                IERC20(policy.denomination).transfer(user, userShare);
            }
        }
    }

    function payoutToCreator(uint256 policyId) public {
        require(
            oracleValues[policyId],
            "Oracle condition not met for this policy"
        );

        InsurancePolicy storage policy = insurancePolicies[policyId];
        for (uint256 i = 0; i < policy.acceptedTokens.length; i++) {
            address token = policy.acceptedTokens[i];
            for (uint256 j = 0; j < policy.usersCommitted.length; j++) {
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
        oracleValues[_id] = _value;
    }

    function setUnicefWallet(address _unicefWallet) public onlyCreator {
        unicefWallet = _unicefWallet;
    }

    function unicefDeposit(
        uint256 policyId,
        address token,
        uint256 amount
    ) public {
        require(msg.sender == unicefWallet, "Only UNICEF can deposit funds");
        require(policyId < nextPolicyId, "Invalid policy ID");

        InsurancePolicy storage policy = insurancePolicies[policyId];
        require(
            policy.requestFundFromUNICEF,
            "Policy did not request UNICEF funding"
        );

        uint256 tokenValueInDenomination = getTokenValueInDenomination(
            token,
            amount,
            policy.denomination
        );
        require(
            policy.fundsCommitted + tokenValueInDenomination <= policy.limit,
            "Limit exceeded"
        );

        policy.receivedFundFromUNICEF = true;
        policy.fundsCommitted += tokenValueInDenomination;
        if (policy.userFundsCommitted[msg.sender][token] == 0) {
            policy.usersCommitted.push(msg.sender); // Add user to the array if not already added
        }
        policy.userFundsCommitted[msg.sender][token] += amount;
        policy.userFundsCommittedDenominated[
            msg.sender
        ] += tokenValueInDenomination;
    }

    function getTokenValueInDenomination(
        address token,
        uint256 amount,
        address denomination
    ) private view returns (uint256) {
        if (token == denomination) {
            return amount;
        }

        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = denomination;
        try uniswapRouter.getAmountsOut(amount, path) returns (
            uint256[] memory amounts
        ) {
            return amounts[1];
        } catch {
            // In case of an error, return the initial amount committed
            return amount;
        }
    }

    struct InsurancePolicyView {
        uint256 policyId;
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
        address[] usersCommitted;
    }

    // Helper function to convert InsurancePolicy to InsurancePolicyView
    function _convertToView(InsurancePolicy storage policy, uint256 policyId)
        private
        view
        returns (InsurancePolicyView memory)
    {
        return
            InsurancePolicyView(
                policyId,
                policy.limit,
                policy.region,
                policy.location,
                policy.coverPeriod,
                policy.probability,
                policy.poolType,
                policy.requestFundFromUNICEF,
                policy.receivedFundFromUNICEF,
                policy.premium,
                policy.fundsCommitted,
                policy.denomination,
                policy.active,
                policy.acceptedTokens,
                policy.creator,
                policy.usersCommitted
            );
    }

    function getPoliciesRequestingUnicefFunding()
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].requestFundFromUNICEF) {
                count++;
            }
        }

        InsurancePolicyView[] memory policies = new InsurancePolicyView[](
            count
        );
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].requestFundFromUNICEF) {
                policies[index++] = _convertToView(insurancePolicies[i], i);
            }
        }
        return policies;
    }

    function getPoliciesWithUnicefFunding()
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].receivedFundFromUNICEF) {
                count++;
            }
        }

        InsurancePolicyView[] memory policies = new InsurancePolicyView[](
            count
        );
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].receivedFundFromUNICEF) {
                policies[index++] = _convertToView(insurancePolicies[i], i);
            }
        }
        return policies;
    }

    function getAllPolicies()
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        InsurancePolicyView[] memory policies = new InsurancePolicyView[](
            nextPolicyId
        );
        for (uint256 i = 0; i < nextPolicyId; i++) {
            policies[i] = _convertToView(insurancePolicies[i], i);
        }
        return policies;
    }

    // View function to get all live policies
    function getAllLivePolicies()
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].active) {
                count++;
            }
        }

        InsurancePolicyView[] memory livePolicies = new InsurancePolicyView[](
            count
        );
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].active) {
                livePolicies[index++] = _convertToView(insurancePolicies[i], i);
            }
        }
        return livePolicies;
    }

    // View function to get all finished policies
    function getAllFinishedPolicies()
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (!insurancePolicies[i].active) {
                count++;
            }
        }

        InsurancePolicyView[]
            memory finishedPolicies = new InsurancePolicyView[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (!insurancePolicies[i].active) {
                finishedPolicies[index++] = _convertToView(
                    insurancePolicies[i],
                    i
                );
            }
        }
        return finishedPolicies;
    }

    // View function to get all policies a given user has committed capital to
    function getPoliciesForInvestor(address user)
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].userFundsCommittedDenominated[user] > 0) {
                count++;
            }
        }

        InsurancePolicyView[] memory userPolicies = new InsurancePolicyView[](
            count
        );
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].userFundsCommittedDenominated[user] > 0) {
                userPolicies[index++] = _convertToView(insurancePolicies[i], i);
            }
        }
        return userPolicies;
    }

    // View function to get all policies created by a given creator
    function getPoliciesForCreator(address creator)
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].creator == creator) {
                count++;
            }
        }

        InsurancePolicyView[]
            memory creatorPolicies = new InsurancePolicyView[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (insurancePolicies[i].creator == creator) {
                creatorPolicies[index++] = _convertToView(
                    insurancePolicies[i],
                    i
                );
            }
        }
        return creatorPolicies;
    }

    // View function to get all policies for a given region
    function getPoliciesForRegion(string memory region)
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (
                keccak256(bytes(insurancePolicies[i].region)) ==
                keccak256(bytes(region))
            ) {
                count++;
            }
        }

        InsurancePolicyView[] memory regionPolicies = new InsurancePolicyView[](
            count
        );
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (
                keccak256(bytes(insurancePolicies[i].region)) ==
                keccak256(bytes(region))
            ) {
                regionPolicies[index++] = _convertToView(
                    insurancePolicies[i],
                    i
                );
            }
        }
        return regionPolicies;
    }

    // View function to get all policies for a given region
    function getPoliciesByType(string memory poolType)
        public
        view
        returns (InsurancePolicyView[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (
                keccak256(bytes(insurancePolicies[i].poolType)) ==
                keccak256(bytes(poolType))
            ) {
                count++;
            }
        }

        InsurancePolicyView[] memory poolPolicies = new InsurancePolicyView[](
            count
        );
        uint256 index = 0;
        for (uint256 i = 0; i < nextPolicyId; i++) {
            if (
                keccak256(bytes(insurancePolicies[i].poolType)) ==
                keccak256(bytes(poolType))
            ) {
                poolPolicies[index++] = _convertToView(insurancePolicies[i], i);
            }
        }
        return poolPolicies;
    }

    // Struct to hold committed amounts in individual tokens
    struct CommittedAmounts {
        address token;
        uint256 amount;
    }

    function getCommittedAmounts(uint256 policyId, address investor)
        public
        view
        returns (
            uint256 totalCommittedInDenomination,
            CommittedAmounts[] memory tokenAmounts
        )
    {
        require(policyId < nextPolicyId, "Invalid policy ID");

        InsurancePolicy storage policy = insurancePolicies[policyId];
        totalCommittedInDenomination = policy.userFundsCommittedDenominated[
            investor
        ];

        uint256 tokenCount = policy.acceptedTokens.length;
        tokenAmounts = new CommittedAmounts[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            address token = policy.acceptedTokens[i];
            uint256 amount = policy.userFundsCommitted[investor][token];
            if (amount > 0) {
                tokenAmounts[i] = CommittedAmounts(token, amount);
            }
        }
    }
}
