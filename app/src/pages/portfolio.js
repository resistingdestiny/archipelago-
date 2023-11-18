import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import PerformanceChart from "components/PerformanceComponent";
import { useBalance } from 'wagmi';
import { useAccount, useProvider } from 'wagmi';
import { getPoliciesForCreator, getPoliciesForInvestor } from 'components/policyViews';

function App() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>
  return <div>{address}</div>
}

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: theme.spacing(4),
    color: "white",
  },
  card: {
    background: "rgba(25, 25, 25, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    color: "white",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#ffffff",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  performanceSection: {
    marginTop: theme.spacing(3),
  },
  // Add other styles as needed
}));
function PortfolioPage() {
  const classes = useStyles();
  const { address, isConnecting, isDisconnected } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  const provider = useProvider(); // Assumed you have set up wagmi provider
  const [policies, setPolicies] = useState([]);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    if (address) {
      getPoliciesForCreator(provider, address)
        .then(data => setPolicies(data))
        .catch(error => console.error("Error fetching policies:", error));

    }
  }, [address, provider]);

  useEffect(() => {
    if (address) {
      getPoliciesForInvestor(provider, address)
        .then(data => setInvestments(data))
        .catch(error => console.error("Error fetching investments:", error));

    }
  }, [address, provider]);

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
          {policies.map((policy, index) => (
            <TableRow key={index}>
              <TableCell>{policy.policyId}</TableCell>
              <TableCell>{policy.poolType}</TableCell>
              <TableCell align="right">{policy.premium}</TableCell>
              <TableCell align="right">{policy.limit}</TableCell>
              <TableCell align="right">{policy.active ? 'Yes' : 'No'}</TableCell>
              {/* Add more cells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const investmentHistoryTable = (
    <TableContainer component={Paper}>
      <Table aria-label="investment history">
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
          {investments.map((investment, index) => (
            <TableRow key={index}>
              <TableCell>{investment.policyId}</TableCell>
              <TableCell>{investment.poolType}</TableCell>
              <TableCell align="right">{investment.premium}</TableCell>
              <TableCell align="right">{investment.limit}</TableCell>
              <TableCell align="right">{investment.active ? 'Yes' : 'No'}</TableCell>
              {/* Add more cells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <Box className={classes.pageContainer}>
      <Container maxWidth="lg">
        <Typography variant="h4" className={classes.title}>
          Portfolio Summary
        </Typography>

        {/* Portfolio cards */}
        <Grid container spacing={4}        mt={4}
>
          {/* Balances Card */}
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">Balances</Typography>
                {isLoading ? <div>Fetching balance…</div> : null}
                {isError ? <div>Error fetching balance</div> : null}
                {data ? <Typography> {data.formatted} {data.symbol}</Typography> : null}
                
                {isDisconnected ? (
                    <Button variant="contained" className={classes.button}>
                      Connect your wallet
                    </Button>
                ) : null}
              </CardContent>
            </Card>
          </Grid>

          {/* Other cards for Yield Earned, ROI, SRBN Balance */}
          {/* ... */}
        </Grid>

        {/* Positions section */}
        {/* ... */}

       

        {/* Transaction History Section */}
        <Typography variant="h5" className={classes.title} style={{ marginTop: "20px", marginBottom: "20px" }}>
          Policies Purchased
        </Typography>
        {policies.length > 0 ? transactionHistoryTable : <Typography>No transactions found.</Typography>}

        {/* Transaction History Section */}
        <Typography variant="h5" className={classes.title} style={{ marginTop: "20px", marginBottom: "20px" }}>
          Investments Made
        </Typography>
        {investments.length > 0 ? investmentHistoryTable : <Typography>No transactions found.</Typography>}


 {/* Performance Chart Section */}
 <Box className={classes.performanceSection}>
          <PerformanceChart />
        </Box>
        {/* Other content */}
      </Container>
    </Box>
  );
}

export default PortfolioPage;
