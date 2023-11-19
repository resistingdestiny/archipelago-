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
} from "@mui/material";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapComponent from 'components/MapComponent'
import PerformanceChart from "components/PerformanceComponent";
import Modal from '@mui/material/Modal';
import { getPolicyById } from "components/policyViews";
import { useAccount, useProvider } from 'wagmi';


const useStyles = makeStyles((theme) => ({
  // Add all your styles here
  pageContainer: {
    backgroundColor: '#121212',
    minHeight: '100vh',
    padding: theme.spacing(4),
    color: 'white',
  },
  mapContainer: {
    height: '400px', 
  },
  card: {
    background: 'rgba(41,41,41, 0.9)', // Semi-transparent dark card background
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
  dottedBox: {
    border: '1px dotted',
    padding: theme.spacing(1),
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
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
    backgroundColor: '#121212',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
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
  const provider = useProvider(); 

const [policy, setPolicy] = React.useState(null);
useEffect(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const policyId = queryParams.get('id');

  if (policyId) {
    getPolicyById(provider, policyId)
      .then(data => setPolicy(data))
      .catch(error => console.error("Error fetching data:", error));
  }
}, [provider]);
  const [modalOpen, setModalOpen] = React.useState(true);
const risk = parseInt(policy?.probability);
  const locations = [
    {
   
      latitude: policy?.location?.latitude,
      longitude: policy?.location?.longitude,
    
    },
  
  ];


  const rows = [
    {      
       type: "Claim (Predicted)", amount: "$500.00", description: "Predicted payment (next week)" },
      {date: "2023-01-01", type: "Claim (Partial)", amount: "$500.00", description: "Paid claim" },
    { date: "2023-02-01", type: "Premium", amount: "-$200.00", description: "Claim payout" },
    // ... more rows
  ];
  
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const getAmountStyle = (type) => {
    switch (type) {
      case 'Claim (Partial)':
        return classes.premium;
      case 'Premium':
        return classes.loss;
      default:
        return null;
    }
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
 
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const eligibleAmount = "100"; 
  const earthquakeAlertModal = (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="earthquake-alert-modal"
      aria-describedby="earthquake-alert-description"
    >
      <Box className={classes.modalStyle}>
        <Typography variant="h6" id="earthquake-alert-modal">
          Earthquake alert
        </Typography>
        <Typography id="earthquake-alert-description" sx={{ mt: 2 }}>
          There is a 60% chance of an earthquake happening. Get emergency payment now (10%), estimated payment later (80%).
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleCloseModal}>
            Get Payment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
  return (
    
    <Box className={classes.pageContainer}>
    
      <Container maxWidth="lg">
      {/* Vault Card */}
      <Card className={classes.card}>
      <CardContent>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <Typography variant="h4" className={classes.title}>
          {policy?.poolType}
          <Chip label="Policy" variant="outlined" sx={{marginLeft: 3, }}className={classes.chip}/> 
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Current Maximum Cover 
        </Typography>
        <Typography variant="h6">
         {policy?.limit}
        </Typography>
       
        <Box sx={{ marginTop: 3, width: '50%' }}>
      <Typography variant="subtitle2" gutterBottom>
        Risk Level
      </Typography>
      <Slider
        aria-label="Risk Level"
        defaultValue={risk}
        valueLabelDisplay="auto" 
        getAriaValueText={() => `10% chance of total loss`}
        step={null}
        marks={[{ value: {risk}, label: '' }]} 
        className={classes.riskSlider}
      />
      <Typography variant="caption" className={classes.riskLabel}>
       {risk} chance of payment in a given year.
      </Typography>
    </Box>   
    {policy && policy.requestFundFromUNICEF && (
             <><Box sx={{ marginTop: 3, width: '50%' }}><Typography variant="subtitle2" sx={{marginBottom: 2}}className={classes.riskLabel}>
                    Sponsored By
                  </Typography><img src='images/unicef.png' alt="UNICEF Logo" style={{ maxWidth: '20%', height: 'auto', marginTop: 5 }} /></Box></>
                 
                
              )}
    
       </Grid>
    <Grid item xs={4} style={{ textAlign: 'center' }}>
  <img src='/images/earthquake.png' alt="Product" style={{ maxWidth: '70%', height: 'auto' }} />

  <Box display="flex" justifyContent="center" mt={1}>
    <Chip
      label="NFT:  0x6BF...9FB3"
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
           Cover Description
          </Typography>
          <Typography variant="body1">
This cover protects you against {policy?.poolType}s and can payout before an event happens.          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h5" className={classes.title}>
           Location
          </Typography>
          <LinearProgress variant="determinate" value={50} />
          {policy && (
                <MapComponent locations={locations} />
              )}
         
          <Box mt={4}>
  {/* Activity Table */}
  <TableContainer component={Paper} className={classes.table}>
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
        </TableContainer>
        </Box>
        </Box>
        <Box>


        </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.depositWithdrawCard}>
              <CardContent>
                <Typography gutterBottom sx={{marginBottom:3}}variant="h6" component="div">
                  Claim Funds
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Eligible Amount"
                  value={eligibleAmount}
                  className={classes.input}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {/* logic to handle fund claim */}}
                  className={classes.submitButton}
                >
                  Claim
                </Button>
              </CardContent>
            </Card>
           
           
          </Grid>
        
        </Grid>
    {earthquakeAlertModal}

      </Container>
    </Box>
  );
}

export default PoolPage;
