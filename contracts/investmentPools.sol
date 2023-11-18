// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Interfaces/IERC4626.sol";
import "./Interfaces/IERC20.sol";
import "https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC20.sol";
import "./InsurancePolicyContract.sol"; // Make sure this path is correct

contract TokenizedVault is IERC4626, ERC20 {
    ERC20 public immutable asset;
    InsurancePolicyContract public insurancePolicyContract;
    address public owner;

    struct InvestmentCriteria {
        string region;
        uint256 minPremiumRate; // Represented as a percentage (e.g., 10% = 1000)
        string poolType;
    }

    InvestmentCriteria public investmentCriteria;
    uint256 public totalCommittedFunds;

    event Deposit(address indexed caller, uint256 amt);
    event Withdraw(address indexed caller, uint256 amt);
    event InvestedInPolicy(uint256 policyId, uint256 amount);
    event InvestmentCriteriaUpdated(string region, uint256 minPremiumRate, string poolType);
    event FundsCommitted(uint256 policyId, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(
        ERC20 _underlying, 
        string memory _name, 
        string memory _symbol, 
        InsurancePolicyContract _insurancePolicyContract,
        string memory _region,
        uint256 _minPremiumRate,
        string memory _poolType
    ) ERC20(_name, _symbol, 18) {
        asset = _underlying;
        insurancePolicyContract = _insurancePolicyContract;
        owner = msg.sender;
        investmentCriteria = InvestmentCriteria({
            region: _region,
            minPremiumRate: _minPremiumRate,
            poolType: _poolType
        });
    }

    function deposit(uint256 assets) public {
        require (assets > 0, "Deposit less than Zero");
        asset.transferFrom(msg.sender, address(this), assets);
        _mint(msg.sender, assets);
        emit Deposit(msg.sender, assets);
    }

    function totalAssets() public view override returns(uint256) {
        return asset.balanceOf(address(this)) - totalCommittedFunds;
    }    

    function redeem(uint256 shares, address receiver) internal returns (uint256 assets) {
        require(shares > 0, "Shares less than Zero");
        require(shareHolder[msg.sender] >= shares, "Insufficient shares");
        shareHolder[msg.sender] -= shares;
        uint256 payout = (shares * totalAssets()) / totalSupply();
        _burn(msg.sender, shares);
        assets = payout;
        emit Withdraw(receiver, assets);
        return assets;
    }

    function withdraw(uint256 shares, address receiver) public {
        uint256 payout = redeem(shares, receiver);
        asset.transfer(receiver, payout);
    }

    function commitFunds(uint256 policyId, uint256 amount) public {
        require(msg.sender == address(insurancePolicyContract), "Unauthorized");
        require(totalAssets() >= amount, "Insufficient assets");
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
        string memory _poolType
    ) public onlyOwner {
        investmentCriteria = InvestmentCriteria({
            region: _region,
            minPremiumRate: _minPremiumRate,
            poolType: _poolType
        });
        emit InvestmentCriteriaUpdated(_region, _minPremiumRate, _poolType);
    }
}
