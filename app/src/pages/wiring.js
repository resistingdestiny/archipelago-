import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Box, // ... other imports ...
} from '@mui/material';
import { useAccount, useConnect, useProvider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { ethers } from 'ethers';
import { insurancePolicyAddress, insurancePolicyABI } from "../util/config-var";
import {getAllPolicies} from "../components/policyViews";

// Async function to fetch policy data


function DashboardPage(props) {
  const [policies, setPolicies] = useState([]);
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });


  useEffect(() => {
    getAllPolicies(provider).then(data => {
      console.log(data);
      setPolicies(data);
    }).catch(error => {
      console.error("Error fetching policies:", error);
    });
  }, [provider.connection.url]); // useEffect dependency on provider URL
  

  return (
    <Box>
      {/* Render policies or other components */}
    </Box>
  );
}

export default DashboardPage;
