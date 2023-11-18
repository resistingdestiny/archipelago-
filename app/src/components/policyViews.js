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
async function GetAllFinishedPolicies() {
    const provider = useProvider();
    console.log(provider.connection.url);
    const ethersProvider = new ethers.providers.JsonRpcProvider(provider.connection.url);
    
    console.log('in fetch');
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, ethersProvider);
    const data = await contract.getAllFinishedPolicies();
    console.log(data);
    return data
}

export default GetAllFinishedPolicies;

