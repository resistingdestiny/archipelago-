import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Button, Box, Container, Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    backgroundColor: theme.palette.primary.main, // Adjust to match your primary color
    color: '#fff',
    padding: theme.spacing(10, 2),
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to right, #6F00FF, #C71585)', // Gradient similar to Uniswap
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(4),
  },
  ctaButton: {
    backgroundColor: '#4CAF50', // Green color for the button
    color: '#fff',
    '&:hover': {
      backgroundColor: '#388E3C', // Darker shade of green for hover effect
    },
  },
}));


function IndexPage() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.heroContainer}>
        <Container maxWidth="md">
          <Typography variant="h2" className={classes.heroTitle}>
            Earn yield by helping to protect the world
          </Typography>
          <Typography variant="h5" className={classes.heroSubtitle}>
            A better yield solution to save the world.
          </Typography>
          <Button 
            variant="contained" 
            className={classes.ctaButton}
            href="/viewall"
          >
            Get Started
          </Button>
        </Container>
      </Box>
      {/* Additional sections can be added here */}
    </>
  );
}

export default IndexPage;
