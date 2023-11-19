import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  TextField,
  Tab,
  Tabs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slider,
  Modal,
} from "@mui/material";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapComponent from 'components/MapComponent'
import PerformanceChart from "components/PerformanceComponent";
import { getPoliciesByType } from 'components/policyViews';
import { useAccount, useProvider } from 'wagmi';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,

} from 'wagmi'
import { ERC20_abi } from "../util/contract";

import {vaultABI} from "../util/config-var";



import { ethers } from "ethers";

import { useSigner } from "wagmi";

const useStyles = makeStyles((theme) => ({
  // Add all your styles here
  pageContainer: {
    backgroundColor: '#121212',
    minHeight: '100vh',
    padding: theme.spacing(4),
    color: 'white',
  },
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400, // or any suitable width
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  viewPortfolioButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#6a1b9a', // A shade of purple
    color: 'white',
    '&:hover': {
      backgroundColor: '#5c1798', // A slightly darker shade for hover
    },
  },
  mapContainer: {
    height: '400px', 
  },
  card: {
    background: 'rgba(25, 25, 25, 0.9)', // Semi-transparent dark card background
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    color: 'white',
    padding: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    border: '1px solid #333', // Border for cards
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: '15px',
      background: 'linear-gradient(45deg, rgba(140, 58, 255, 0.1), rgba(73, 63, 252, 0.1))',
      zIndex: 1,
      pointerEvents: 'none',
    },
    zIndex: 2,
    marginBottom: theme.spacing(3), 
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: theme.spacing(3),
  },
  subtitle: {
    color: theme.palette.grey[500],
  },
  premium: {
    fontWeight: 'bold',
    color: 'green',
  },
  loss: {
    fontWeight: 'bold',
    color: 'red',
  },
  section: {
    margin: theme.spacing(2, 0),
  },
  chip: {
    marginRight: theme.spacing(1),
    color: 'white',
    backgroundColor: '#333',
  },
  depositWithdrawContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
  },
  depositWithdrawCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    padding: theme.spacing(2),
    flexGrow: 1,
    '&:first-child': {
      marginRight: theme.spacing(2),
    },
  },
  contractChip: {
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.23)',
    '&.MuiChip-root': {
      backgroundColor: '#333', 
    },
    '& .MuiChip-icon': {
      color: 'rgba(255, 255, 255, 0.7)', 
    },
    cursor: 'pointer', 
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center', 
  },
  input: {
    color: 'white',
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#BB86FC', // Glowing effect
      },
    },
  },
  tab: {
    color: 'white',
    '&.Mui-selected': {
      color: '#BB86FC',
    },
  },
  tabs: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.23)',
  },
  riskSlider: {
    height: 8,
    borderRadius: 4,
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#bfbfbf', // This is the background color
    },
    '& .MuiSlider-track': {
      border: 'none',
      borderRadius: 4,
      background: 'linear-gradient(to right, #00e676, #ff1744)', // Gradient from green to red
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
  },
  riskLabel: {
    display: 'block',
    textAlign: 'left',
    marginTop: theme.spacing(1),
  },
}));

function PoolPage() {
  const [vaultAddress, setVaultAddress] = useState('0xc53A060aa339992d3E5A69258211aa64F9B8891c');

  const provider = useProvider(); 

  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState(100);

 // Define state variables for each parameter
 const [showSuccessModal, setShowSuccessModal] = useState(false);
 const {data: signer, issignerError, issignerLoading} = useSigner();
 const [contractArgs, setContractArgs] = useState([ethers.BigNumber.from(100), address]);
 const approveInsuranceContract = new ethers.Contract('0xA286353240EC0FaC61E3864d6C25f4c47115a070', ERC20_abi, provider); 
 const approveContract = approveInsuranceContract.connect(signer);
 const { config: depositConfig } = usePrepareContractWrite({
  address: vaultAddress, // The contract address
  abi: vaultABI, // The ABI of the contract
  functionName: 'deposit', // The name of the function to call
  args: contractArgs
});

const { data, error, isError, write } = useContractWrite(depositConfig)
  console.log(depositConfig)
const { isLoading, isSuccess } = useWaitForTransaction({
  hash: data?.hash,
})
 const [policiesData, setPoliciesData] = useState([]); 
 const [poolName, setPoolName] = useState('');
 const [poolBalance, setPoolBalance] = useState('');
 const [poolCapacity, setPoolCapacity] = useState('');
 const [poolYield, setPoolYield] = useState('');
 const [utilization, setUtilization] = useState('');
 const [policies, setPolicies] = useState('');
 const [risk, setRisk] = useState('');
 const [description, setDescription] = useState('');
 const [tags, setTags] = useState([]);
 const [image, setImage] = useState ('');
 const [poolType, setPoolType] = useState('');
 
 useEffect(() => {
   // Parse the query string
   const queryParams = new URLSearchParams(window.location.search);
   setPoolName(queryParams.get('name') || '');
   setPoolBalance(queryParams.get('balance') || '');
   setPoolCapacity(queryParams.get('capacity') || '');
   setPoolYield(queryParams.get('yield') || '');
   setUtilization(queryParams.get('utilization') || '');
   setRisk(parseInt(queryParams.get('risk'), 10) || 0);
   setDescription(queryParams.get('description') || '');
   setImage(queryParams.get('image') || '')
   setImage(queryParams.get('image') || '')
    setPoolType(queryParams.get('poolType') || '')
    setPoolType(queryParams.get('poolType') || '')
    setVaultAddress(queryParams.get('address') || '')
   // Extract tags
   const extractedTags = [];
   queryParams.forEach((value, key) => {
     if (key.startsWith('tag')) {
       extractedTags.push(value);
     }
   });
   setTags(extractedTags);
 }, []);

 useEffect(() => {

 getPoliciesByType(provider, poolType)
   .then(data => setPoliciesData(data))
   .catch(error => console.error("Error fetching policies:", error));
}, [poolName]);

console.log(policiesData);
const handleInvest = async () => {
  let gasAcceptPrice = await signer.getGasPrice();

  try {
    await approveContract.approve(vaultAddress, ethers.BigNumber.from('10000000000000000'),  {
      gasLimit: 300000,
      gasPrice: gasAcceptPrice.mul(1),
    });  
    console.log('approved')
    const tx = await write();
    console.log('Transaction initiated:', tx);
    setShowSuccessModal(true);

  } catch (error) {
    console.error('Error executing contract write:', error);
  }
};

const transactionHistoryTable = (
  <TableContainer component={Paper}>
    <Table aria-label="transaction history">
      <TableHead>
        <TableRow>
          <TableCell>Policy ID</TableCell>
          <TableCell>Pool Type</TableCell>
          <TableCell align="right">Premium</TableCell>
          <TableCell align="right">Limit</TableCell>
          <TableCell align="right">Active</TableCell>
          {/* Add more columns as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        {policiesData.map((policy, index) => (

          <TableRow key={index}>

            <TableCell>{policy.policyId}</TableCell>
            <TableCell>{policy.poolType}</TableCell>
            <TableCell align="right">{policy.premium}</TableCell>
            <TableCell align="right">{policy.limit}</TableCell>
            <TableCell align="right">{policy.active ? 'Yes' : 'No'}</TableCell>
            <TableCell>
            <Link href={`/poolCover?id=${policy.policyId}`} color="inherit" underline="none">
              <Button variant="contained" color="primary" size="small">
                View
              </Button>
            </Link>
          </TableCell>
          </TableRow>

        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
const generateLocationData = () => {
  return policiesData.map((policy) => ({
    latitude: policy.location?.latitude,
    longitude: policy.location?.longitude,
    title: `Policy ${policy.policyId}`, // Example title
    description: policy.description || 'No description available', // Example description
    // Add any other relevant data here
  }));
};
const locationData = generateLocationData();


  const rows = [
    { date: "2023-01-01", type: "Premium Earned", amount: "$500.00", description: "Monthly premium" },
    { date: "2023-02-01", type: "Loss", amount: "-$200.00", description: "Claim payout" },
    // ... more rows
  ];
  

  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const getAmountStyle = (type) => {
    switch (type) {
      case 'Premium Earned':
        return classes.premium;
      case 'Loss':
        return classes.loss;
      default:
        return null;
    }
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const successModal = (
    <Modal
      open={showSuccessModal}
      onClose={() => setShowSuccessModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalStyle}>
        <Typography id="modal-modal-title" variant="h6">
          Congratulations!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You have successfully invested in a policy.
        </Typography>
        <Link href="/portfolio"> <Button className={classes.viewPortfolioButton} >
          View Portfolio
        </Button> </Link>
      </Box>
    </Modal>
  );
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
 
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
  return (
    <Box className={classes.pageContainer}>
      <Container maxWidth="lg">
      {successModal}

      {/* Vault Card */}
      <Card className={classes.card}>
      <CardContent>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <Typography variant="h4" className={classes.title}>
        {poolName}
        <Chip label="Island" variant="outlined" sx={{marginLeft: 3, }}className={classes.chip}/> 
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Current Vault Deposits
        </Typography>
        <Typography variant="h6">
        {poolBalance}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Max Vault Capacity
        </Typography>
        <Typography variant="h6">
        {poolCapacity}
        </Typography>
        <Box sx={{ marginTop: 3, width: '50%' }}>
  <Typography variant="subtitle2" gutterBottom>
    Risk Level
  </Typography>
  <Slider
  aria-label="Risk Level"
  value={risk} 
  valueLabelDisplay="auto" 
  getAriaValueText={() => `${risk}% chance of total loss`}
  step={null}
  marks={[{ value: risk, label: '' }]} 
  className={classes.riskSlider}
/>
  <Typography variant="caption" className={classes.riskLabel}>
    {risk}% chance of total loss of funds in a given year. 
  </Typography>
</Box>    </Grid>
    <Grid item xs={4} style={{ textAlign: 'center' }}>
  <img src={image} alt="Product" style={{ maxWidth: '70%', height: 'auto' }} />

  <Box display="flex" justifyContent="center" mt={1}>
    <Chip
  label={`Yield: ${poolYield}APR`}
  variant="outlined"
      onClick={() => handleCopyToClipboard('0x6BF...9FB3')}
      className={classes.contractChip}
    />
  </Box>
</Grid>
    </Grid>
  </CardContent>

        </Card>
       

        {/* Deposit & Withdraw Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
        <Box className={classes.section}>
          <Typography variant="h5" className={classes.title}>
            Vault Strategy
          </Typography>
          <Typography variant="body1">
            The vault earns yield on its deposits through premiums from protecting people from {poolType}s as well as investment income.
          </Typography>
        </Box>
        <Box mt={4}>
  {/* Activity Table */}
{/*   <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell align="right" className={getAmountStyle(row.type)}>
            {row.amount}
          </TableCell>                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
          <Typography variant="h5" className={classes.title} style={{ marginTop: "20px", marginBottom: "20px" }}>
          Policies Protected
        </Typography>
        {policiesData.length > 0 ? transactionHistoryTable : <Typography>No transactions found.</Typography>}

        </Box>
        {locationData.length > 0 && (
              <Box className={classes.section}>
                <Typography variant="h5" className={classes.title}>
                  Locations
                </Typography>
                <LinearProgress variant="determinate" value={50} />
                <MapComponent locations={locationData} />
              </Box>
            )}
         
        <Box mt={4}>

<PerformanceChart />
</Box>
        <Box>


        </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.depositWithdrawCard}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="inherit"
                className={classes.tabs}
              >
                <Tab label="Deposit" className={classes.tab} />
                <Tab label="Withdraw" className={classes.tab} />
              </Tabs>
              {tabValue === 0 && (
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Deposit
                  </Typography>
                  <TextField
  fullWidth
  variant="outlined"
  label="Amount"
  className={classes.input}
  value={depositAmount}
  onChange={(e) => setDepositAmount(e.target.value)}
/>
                  <Button variant="contained" onClick={handleInvest} color="primary" fullWidth>
                    Deposit
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    Your wallet will be deployed to this vault 
                  </Typography>
                </CardContent>
              )}
              {tabValue === 1 && (
                <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Withdraw
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Amount "
                  className={classes.input}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleWithdraw(/* pass withdrawal amount here */)}
                >
                  Withdraw
                </Button>
                <Typography variant="body2" color="textSecondary" >
                  Withdrawals are processed instantly. A withdrawal fee may apply.
                </Typography>
              </CardContent>
              )}
            </Card>
  <Box display="flex" justifyContent="center" alignItems="center" className={classes.section}>
    <Chip
      
      label={`Vault Address: ${vaultAddress}`}
      variant="outlined"
      onClick={() => handleCopyToClipboard('0x6BF...9FB3')}
      className={classes.contractChip}
    />
  </Box>

  {/* {policiesTable} */}

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PoolPage;
