// import { useContractRead } from 'wagmi';
import { tokenizedVaultFactoryAddress, tokenizedVaultFactoryAbi } from "../util/config-var"; // Import your contract details
import { ethers } from 'ethers';


export async function getAllVaults(provider) {
    const contract = new ethers.Contract(tokenizedVaultFactoryAddress, tokenizedVaultFactoryAbi, provider);
    try {
        const totalVaults = await contract.totalVaults();
        const vaults = [];
        for (let i = 0; i < totalVaults; i++) {
            const vault = await contract.vaults(i);
            vaults.push(formatVault(vault));
        }
        return vaults;
    } catch (error) {
        console.error("Error fetching all vaults:", error);
        return [];
    }
}

export async function getVaultById(provider, contractAddress, abi, vaultId) {
    const contract = new ethers.Contract(tokenizedVaultFactoryAddress, tokenizedVaultFactoryAbi, provider);
    try {
        const vault = await contract.getVaultDetails(vaultId);
        return formatVault(vault);
    } catch (error) {
        console.error("Error fetching vault by ID:", error);
        return null;
    }
}

function formatVault(vault) {
    return {
        vaultAddress: vault.vaultAddress,
        underlyingAsset: vault.underlyingAsset,
        investmentCriteria: {
            region: vault.investmentCriteria.region,
            minPremiumRate: vault.investmentCriteria.minPremiumRate.div(1000).toNumber(),
            denomination: vault.investmentCriteria.denomination,
            poolType: vault.investmentCriteria.poolType
        },
        name: vault.name,
        symbol: vault.symbol
    };
}
