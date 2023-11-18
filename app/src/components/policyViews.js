// import { useContractRead } from 'wagmi';
import { readContract } from '@wagmi/core'
import { insurancePolicyAddress, insurancePolicyABI } from "../util/config-var"; // Import your contract details
import { publicProvider } from "wagmi/providers/public";
import { useProvider } from 'wagmi';
import { ethers } from 'ethers';

// async function GetAllFinishedPolicies() {
//     // console.log(insurancePolicyAddress, 'insurancePolicyAddress');
//     // console.log(insurancePolicyABI, 'insurancePolicyAddress');
//     //   const { data, isError, isLoading } = useContractRead({
//     //     addressOrName: insurancePolicyAddress,
//     //     contractInterface: insurancePolicyABI,
//     //     functionName: 'getAllFinishedPolicies',
//     //   });
//     const data = await readContract({
//         address: insurancePolicyAddress,
//         abi: insurancePolicyABI,
//         functionName: 'getAllFinishedPolicies',
//     })
//     console.log(data, 'data all finished policies');
//     return data
// }

// export default GetAllFinishedPolicies;
console.log('test');

export async function getpolicy(ethersProvider) {
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, ethersProvider );
    try {
      const data = await contract.getPoliciesRequestingUnicefFunding();
    
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  }



