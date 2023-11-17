import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import PerformanceChart from "components/PerformanceComponent";

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
                {/* Content for Balances */}
                <Typography variant="h6">Balances</Typography>
                {/* Placeholder for balance content */}
                <Typography>---</Typography>
                <Button variant="contained" className={classes.button}>
                  Connect your wallet
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Other cards for Yield Earned, ROI, SRBN Balance */}
          {/* ... */}
        </Grid>

        {/* Positions section */}
        {/* ... */}

        {/* Performance Chart Section */}
        <Box className={classes.performanceSection}>
          <PerformanceChart />
        </Box>

        {/* Transaction History Section */}
        <Typography variant="h5" className={classes.title} style={{ marginTop: "20px" }}>
          Transaction History
        </Typography>
        {/* Placeholder for transaction history */}
        <Typography>---</Typography>

        {/* Other content */}
      </Container>
    </Box>
  );
}

export default PortfolioPage;
