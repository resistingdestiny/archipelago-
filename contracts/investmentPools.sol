//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Interfaces/IERC4626.sol";
import "./Interfaces/IERC20.sol";
import "https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC20.sol";
import "./InsurancePolicyContract.sol";

contract TokenizedVault is IERC4626, ERC20 {
    ERC20 public immutable asset;
    InsurancePolicyContract public insurancePolicyContract;

    event Deposit(address indexed caller, uint256 amt);
    event Withdraw(address indexed caller, uint256 amt, uint256 per);
    event InvestedInPolicy(uint256 policyId, uint256 amount);

    mapping(address => uint256) public shareHolder;

    constructor(
        ERC20 _underlying, 
        string memory _name, 
        string memory _symbol, 
        InsurancePolicyContract _insurancePolicyContract
    ) ERC20(_name, _symbol, 18) {
        asset = _underlying;
        insurancePolicyContract = _insurancePolicyContract;
    }

    // Deposit function
    function deposit(uint256 assets) public {
        require(assets > 0, "Deposit less than Zero");
        asset.transferFrom(msg.sender, address(this), assets);
        shareHolder[msg.sender] += assets;
        _mint(msg.sender, assets);
        emit Deposit(msg.sender, assets);
    }

    // Total assets in the vault
    function totalAssets() public view override returns(uint256) {
        return asset.balanceOf(address(this));
    }    

    // Redeem logic
    function redeem(uint256 shares, address receiver) internal returns (uint256 assets) {
        require(shareHolder[msg.sender] >= shares, "Not enough shares");
        shareHolder[msg.sender] -= shares;
        uint256 per = (shares * 10) / 100;
        _burn(msg.sender, shares);
        assets = shares - per;
        emit Withdraw(receiver, assets, per);
        return assets;
    }

    // Withdraw function
    function withdraw(uint256 shares, address receiver) public {
        uint256 payout = redeem(shares, receiver);
        asset.transfer(receiver, payout);
    }

    // Invest in an insurance policy
    function investInPolicy(uint256 policyId, uint256 amount) public {
        InsurancePolicyContract.InsurancePolicy memory policy = insurancePolicyContract.getPolicy(policyId);
        if (policy.premiumRate > 1000) { // 10% rate
            require(amount <= asset.balanceOf(address(this)), "Insufficient balance");
            asset.approve(address(insurancePolicyContract), amount);
            insurancePolicyContract.investFromVault(policyId, amount, address(this));
            emit InvestedInPolicy(policyId, amount);
        }
    }
}
