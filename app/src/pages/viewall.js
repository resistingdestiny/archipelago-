import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useRouter } from "next/router";
import Meta from "components/Meta";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

import { makeStyles } from "@mui/styles";


import Web3 from 'web3';
import { useNetwork } from 'wagmi'


const useStyles = makeStyles((theme) => ({
  // ... your existing styles
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function DashboardPage(props) {
  const classes = useStyles();
  const [selectedToken, setSelectedToken] = useState('');
  const [riskType, setRiskType] = useState('');
  const [expectedYield, setExpectedYield] = useState('Select options to calculate');

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
  };

  const handleRiskChange = (event) => {
    setRiskType(event.target.value);
  };

  const calculateYield = () => {
 
    setExpectedYield("Estimated Yield: X%");
  };
 
  return (

    <> 
      <Meta title="Dashboard" />
      <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <FormControl className={classes.formControl}>
                  <InputLabel id="token-select-label">Token</InputLabel>
                  <Select
                    labelId="token-select-label"
                    id="token-select"
                    value={selectedToken}
                    onChange={handleTokenChange}
                  >
                    <MenuItem value={"Token1"}>Token1</MenuItem>
                    <MenuItem value={"Token2"}>Token2</MenuItem>
                    {/* Add more tokens as needed */}
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="risk-select-label">Risk Type</InputLabel>
                  <Select
                    labelId="risk-select-label"
                    id="risk-select"
                    value={riskType}
                    onChange={handleRiskChange}
                  >
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                  </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={calculateYield}>
                  Calculate Yield
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Expected Yield
                </Typography>
                <Typography variant="body1">
                  {expectedYield}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Section>
      
       
   
    </>

    
  );
}

export default DashboardPage;





