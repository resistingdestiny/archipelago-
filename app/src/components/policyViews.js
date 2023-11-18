// import { useContractRead } from 'wagmi';
import { readContract } from '@wagmi/core'
import { insurancePolicyAddress, insurancePolicyABI } from "../util/config-var"; // Import your contract details
import { publicProvider } from "wagmi/providers/public";
import { useProvider } from 'wagmi';
import { ethers } from 'ethers';

export async function getPoliciesRequestingUnicefFunding(provider) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getPoliciesRequestingUnicefFunding();
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching policies requesting UNICEF funding:", error);
      return [];
    }
}

export async function getPoliciesWithUnicefFunding(provider) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getPoliciesWithUnicefFunding();
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching policies with UNICEF funding:", error);
      return [];
    }
}

export async function getAllPolicies(provider) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getAllPolicies();
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching all policies:", error);
      return [];
    }
}

export async function getAllLivePolicies(provider) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getAllLivePolicies();
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching live policies:", error);
      return [];
    }
}

export async function getAllFinishedPolicies(provider) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getAllFinishedPolicies();
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching finished policies:", error);
      return [];
    }
}

export async function getPoliciesForInvestor(provider, investorAddress) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getPoliciesForInvestor(investorAddress);
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching policies for investor:", error);
      return [];
    }
}

export async function getPoliciesForCreator(provider, creatorAddress) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getPoliciesForCreator(creatorAddress);
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching policies for creator:", error);
      return [];
    }
}

export async function getPoliciesForRegion(provider, region) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getPoliciesForRegion(region);
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching policies for region:", error);
      return [];
    }
}

export async function getPoliciesByType(provider, poolType) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.getPoliciesByType(poolType);
      return policies.map(policy => formatPolicy(policy));
    } catch (error) {
      console.error("Error fetching policies for region:", error);
      return [];
    }
}

export async function getPolicyById(provider, policyId) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
      const policies = await contract.insurancePolicies(policyId);

      // Add policyId to each policy before formatting
      const formattedPolicies = policies.map(policy => {
        // Include policyId in the policy object before formatting
        const policyWithId = {...policy, policyId};
        return formatPolicy(policyWithId); // Format the policy with the policyId included
      });

      return formattedPolicies;
    } catch (error) {
      console.error("Error fetching policies by id:", error);
      return [];
    }
}


function formatPolicy(policy) {
    return {
        policyId: policy.policyId.toString(),
        limit: policy.limit.toString(),
        region: policy.region,
        location: {
            longitude: policy.location[0].div(1e6).toNumber(),
            latitude: policy.location[1].div(1e6).toNumber(),
            radius: policy.location[2].toString()
        },
        coverPeriod: {
            start: policy.coverPeriod[0].toString(),
            end: policy.coverPeriod[1].toString()
        },
        probability: policy.probability.div(1000).toNumber(),
        poolType: policy.poolType,
        requestFundFromUNICEF: policy.requestFundFromUNICEF,
        receivedFundFromUNICEF: policy.receivedFundFromUNICEF,
        premium: policy.premium.toString(),
        fundsCommitted: policy.fundsCommitted.toString(),
        denomination: policy.denomination,
        active: policy.active,
        acceptedTokens: policy.acceptedTokens,
        creator: policy.creator,
        usersCommitted: policy.usersCommitted
    };
}

export async function getCommittedAmounts(provider, policyId, investor) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, provider);
    try {
        const data = await contract.getCommittedAmounts(policyId, investor);
        return formatCommittedAmounts(data);
    } catch (error) {
        console.error("Error fetching committed amounts:", error);
        return {};
    }
}

function formatCommittedAmounts(data) {
    // Assuming data structure as { totalCommittedInDenomination, tokenAmounts }
    const { totalCommittedInDenomination, tokenAmounts } = data;

    return {
        totalCommittedInDenomination: totalCommittedInDenomination.toString(),
        tokenAmounts: tokenAmounts.map(amount => ({
            token: amount.token,
            amount: amount.amount.toString()
        }))
    };
}
