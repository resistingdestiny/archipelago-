// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./TokenizedVault.sol";

contract TokenizedVaultFactory {
    // Struct to hold vault creation parameters
    struct VaultParams {
        address vaultAddress;
        address underlyingAsset;
        TokenizedVault.InvestmentCriteria investmentCriteria;
        string name;
        string symbol;
    }

    // Mapping from a uint ID to its vault creation parameters
    mapping(uint => VaultParams) public vaults;

    // Counter to generate unique keys for vaults
    // uint private vaultIdCounter;
    uint public totalVaults; // Public variable to track the total number of vaults

    // Event to emit when a new vault is created
    event VaultCreated(uint indexed vaultId, address indexed vaultAddress, VaultParams params);

    // Function to create a new TokenizedVault using create2
    function createVault(
        ERC20 underlyingAsset,
        string memory name,
        string memory symbol,
        IInsurancePolicyContract insurancePolicyContract,
        string memory region,
        uint256 minPremiumRate,
        address denomination,
        string memory poolType
    ) public returns (uint) {
        // Increment the counter to get a new unique ID
        uint vaultId = ++totalVaults -1;
        bytes32 salt = keccak256(abi.encodePacked("Some random string", block.timestamp));
        TokenizedVault newVault = new TokenizedVault{
            salt: salt
        }(
            underlyingAsset,
            name,
            symbol,
            insurancePolicyContract,
            region,
            minPremiumRate,
            denomination,
            poolType
        );

        // Store the parameters of the newly created vault
        address newVaultAddress = address(newVault);
        vaults[vaultId] = VaultParams({
            vaultAddress: newVaultAddress,
            underlyingAsset: address(underlyingAsset),
            investmentCriteria: TokenizedVault.InvestmentCriteria({
                region: region,
                minPremiumRate: minPremiumRate,
                denomination: denomination,
                poolType: poolType
            }),
            name: name,
            symbol: symbol
        });

        emit VaultCreated(vaultId, newVaultAddress, vaults[vaultId]);

        return vaultId;
    }

    // Function to get vault details by vault ID
    function getVaultDetails(uint vaultId) public view returns (VaultParams memory) {
        return vaults[vaultId];
    }
}
