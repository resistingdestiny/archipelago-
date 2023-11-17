import React from "react";
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
} from "@mui/material";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapComponent from 'components/MapComponent'

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
  },
  subtitle: {
    color: theme.palette.grey[500],
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
}));

function PoolPage() {

  const locations = [
    {
      title: 'Istanbul',
      latitude: 41.0082,
      longitude: 28.9784,
      description: 'The historical and economic hub of Turkey.',
      streetViewImageUrl: '/path-to-istanbul-street-view.jpg'
    },
    {
      title: 'Ankara',
      latitude: 39.9334,
      longitude: 32.8597,
      description: 'The capital city of Turkey, known for its government buildings and museums.',
      streetViewImageUrl: '/path-to-ankara-street-view.jpg'
    },
    {
      title: 'Cappadocia',
      latitude: 38.6431,
      longitude: 34.8289,
      description: 'Famous for its unique geological formations and hot air balloon flights.',
      streetViewImageUrl: '/path-to-cappadocia-street-view.jpg'
    },
    {
      title: 'Ephesus',
      latitude: 37.9398,
      longitude: 27.3403,
      description: 'An ancient Greek city with well-preserved ruins and a rich history.',
      streetViewImageUrl: '/path-to-ephesus-street-view.jpg'
    }
  ];
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
 
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
 
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
  return (
    <Box className={classes.pageContainer}>
      <Container maxWidth="lg">
      {/* Vault Card */}
      <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4" className={classes.title}>
              T-SAVAX-C
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Chip label="COVERED CALL" className={classes.chip} />
              <Chip label="U2" className={classes.chip} />
            </Box>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Current Vault Deposits
            </Typography>
            <Typography variant="h6">
              6.258, 13 SAVAX
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Max Vault Capacity
            </Typography>
            <Typography variant="h6">
              200K SAVAX
            </Typography>
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
            The vault earns yield on its SAVAX deposits by running a weekly automated SAVAX covered call strategy where it stakes its SAVAX deposits in Benqi and then uses its SAVAX to collateralize weekly out-of-money SAVAX call options. The yield earned from both the covered call strategy and the SAVAX staking rewards are reinvested weekly, effectively compounding the yields for depositors over time.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h5" className={classes.title}>
           Locations
          </Typography>
          <LinearProgress variant="determinate" value={50} />
          <MapComponent locations={locations} />

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
                    label="Amount (SAVAX)"
                    className={classes.input}
                  />
                  <Button variant="contained" color="primary" fullWidth>
                    Connect Wallet
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    Your deposit will be deployed in the vault's weekly strategy on Friday at 11am UTC
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
                  label="Amount (SAVAX)"
                  className={classes.input}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleWithdraw(/* pass withdrawal amount here */)}
                >
                  Disconnect Wallet
                </Button>
                <Typography variant="body2" color="textSecondary" >
                  Withdrawals are processed instantly. A withdrawal fee may apply.
                </Typography>
              </CardContent>
              )}
            </Card>
  <Box display="flex" justifyContent="center" alignItems="center" className={classes.section}>
    <Chip
      
      label="Contract:  0x6BF...9FB3"
      variant="outlined"
      onClick={() => handleCopyToClipboard('0x6BF...9FB3')}
      className={classes.contractChip}
    />
  </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PoolPage;
