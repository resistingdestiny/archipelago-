// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC4626.sol";
import "https://github.com/transmissions11/solmate/blob/main/src/mixins/ERC4626.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
// import "./InsurancePolicyContract.sol"; // Make sure this path is correct

pragma solidity ^0.8.0;


interface IInsurancePolicyContract {

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
        // Other members as per the original struct definition
    }
    // Function to commit funds to an insurance policy
    function commitFunds(
        uint256 policyId,
        address token,
        uint256 amount
    ) external;
    // Mapping to access individual insurance policies
    function insurancePolicies(uint256 policyId) external view returns (InsurancePolicy memory);
}


contract TokenizedVault is ERC4626 {
   ERC20 public immutable assetContract;

    IInsurancePolicyContract public insurancePolicyContract;
    address public owner;

    struct InvestmentCriteria {
        string region;
        uint256 minPremiumRate; // Represented as a percentage (e.g., 10% = 1000)
        address denomination;
        string poolType;
    }

    InvestmentCriteria public investmentCriteria;
    uint256 public totalCommittedFunds;

    // event Deposit(address indexed caller, address indexed owner, uint256 assets, uint256 shares);
    // event Withdraw(address indexed caller, address indexed receiver, address indexed owner, uint256 assets, uint256 shares);
    event InvestmentCriteriaUpdated(string region, uint256 minPremiumRate, address denomination, string poolType);
    event FundsCommitted(uint256 policyId, uint256 amount);
    event FundsReleased(uint256 indexed policyId, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Adjusted constructor
    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol,
        IInsurancePolicyContract _insurancePolicyContract,
        string memory _region,
        uint256 _minPremiumRate,
        address _denomination,
        string memory _poolType
    ) ERC4626(_asset, _name, _symbol) {
        assetContract = _asset;
        insurancePolicyContract = _insurancePolicyContract;
        owner = msg.sender;
        investmentCriteria = InvestmentCriteria({
            region: _region,
            minPremiumRate: _minPremiumRate,
            denomination: _denomination,
            poolType: _poolType
        });
    }

    // Function to update the address of the insurance policy contract
    function updateInsurancePolicyContract(IInsurancePolicyContract newContract) public onlyOwner {
        require(address(newContract) != address(0), "Invalid address");
        insurancePolicyContract = newContract;
    }

    function totalAssetsAvailable()  public view returns (uint256) {
        // return 10 - totalCommittedFunds;
        return assetContract.balanceOf(address(this)) - totalCommittedFunds;
    }    
    // Override the totalAssets function from ERC4626
    function totalAssets() public view override returns (uint256) {
        // Implementation for totalAssets. 
        // For example, this might return the balance of the underlying asset:
        return assetContract.balanceOf(address(this));
    }
    // Function to commit funds to an insurance policy
    function commitFunds(uint256 policyId, uint256 amount) public {
        require(msg.sender == address(insurancePolicyContract), "Unauthorized");
        require(totalAssetsAvailable() >= amount, "Insufficient assets");

        // Directly access the insurance policy data
        IInsurancePolicyContract.InsurancePolicy memory policy = insurancePolicyContract.insurancePolicies(policyId);
        require(policy.active, "Policy is not active");


        // Check if investment criteria are met
        require(keccak256(bytes(policy.region)) == keccak256(bytes(investmentCriteria.region)), "Region criteria not met");
        require(policy.premium * 1000 / policy.limit >= investmentCriteria.minPremiumRate, "Minimum premium rate criteria not met");
        require(keccak256(bytes(policy.poolType)) == keccak256(bytes(investmentCriteria.poolType)), "Pool type criteria not met");
        require(investmentCriteria.denomination == policy.denomination, "Not correct denomination address");
        
        
        // Call commitFunds on the insurancePolicyContract
        insurancePolicyContract.commitFunds(policyId, investmentCriteria.denomination, amount);
        // If the call is successful, update the totalCommittedFunds
        totalCommittedFunds += amount;
        
        // Approve the insurancePolicyContract to transfer the specified amount of the asset
        assetContract.approve(address(insurancePolicyContract), amount);

        emit FundsCommitted(policyId, amount);
    
        totalCommittedFunds += amount;
        emit FundsCommitted(policyId, amount);
    }

    // Function to release committed funds for an insurance policy
    function releaseFunds(uint256 policyId, uint256 amount) public {
        require(msg.sender == address(insurancePolicyContract), "Unauthorized");
        require(totalCommittedFunds >= amount, "Insufficient committed funds");

        totalCommittedFunds -= amount;
        emit FundsReleased(policyId, amount);
    }

    function updateInvestmentCriteria(
        string memory _region,
        uint256 _minPremiumRate,
        address _denomination,
        string memory _poolType
    ) public onlyOwner {
        investmentCriteria = InvestmentCriteria({
            region: _region,
            minPremiumRate: _minPremiumRate,
            denomination: _denomination,
            poolType: _poolType
        });
        emit InvestmentCriteriaUpdated(_region, _minPremiumRate, _denomination, _poolType);
    }
}
