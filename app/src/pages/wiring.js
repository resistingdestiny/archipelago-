
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  Avatar,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { publicProvider } from '@wagmi/core/providers/public'
// import { GetAllFinishedPolicies } from 'components/policyViews';
import { useProvider } from 'wagmi';
import { ethers } from 'ethers';
import { insurancePolicyAddress, insurancePolicyABI } from "../util/config-var"; // Import your contract details


async function getpolicy() {
    const provider = useProvider();
    console.log(provider.connection.url);
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
//   console.log(address, isConnected,connect, publicProvider);


    console.log(provider.connection.url);
    const ethersProvider = new ethers.providers.JsonRpcProvider(provider.connection.url);

    console.log('in fetch');
    const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, ethersProvider);
    const data = await contract.getAllPolicies();
    return data;
    console.log(data);
}

function DashboardPage(props) {
    getpolicy()
//     const provider = useProvider();
//     console.log(provider.connection.url);
//     const { address, isConnected } = useAccount()
//     const { connect } = useConnect({
//       connector: new InjectedConnector(),
//     })
// //   console.log(address, isConnected,connect, publicProvider);


//     console.log(provider.connection.url);
//     const ethersProvider = new ethers.providers.JsonRpcProvider(provider.connection.url);

//     console.log('in fetch');
//     const contract = new ethers.Contract(insurancePolicyAddress, insurancePolicyABI, ethersProvider);
//     const data = contract.getAllPolicies();
//     console.log(data);
    return 'suck'
}

export default DashboardPage;
