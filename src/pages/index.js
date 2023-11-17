import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Button, Box, Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    backgroundColor: '#121212', // Dark background
    color: '#fff',
    padding: theme.spacing(10, 2),
    textAlign: 'center',
    position: 'relative',
  },
  glowingBorder: {
    boxShadow: '0 0 10px #9c27b0, 0 0 20px #9c27b0, 0 0 30px #9c27b0', // Glowing purple effect
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    fontFamily: '"Orbitron", sans-serif', // Digital-style font
    color: '#e0e0e0', // Lighter text for dark mode
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(4),
    color: '#bdbdbd', // Lighter text for dark mode
  },
  ctaButton: {
    backgroundColor: '#673ab7', // Purple color
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5e35b1',
    },
  },
}));

function IndexPage() {
  const classes = useStyles();

  return (
    <>
      <Box className={`${classes.heroContainer} ${classes.glowingBorder}`}>
        <Container maxWidth="md">
          <Typography variant="h2" className={classes.heroTitle}>
            Archipelago
          </Typography>
          <Typography variant="h5" className={classes.heroSubtitle}>
           Earn yields while keeping the world safe.
          </Typography>
          <Button 
            variant="contained" 
            className={classes.ctaButton}
            href="/pricing"
          >
            Get Started
          </Button>
        </Container>
      </Box>
      {/* Additional sections with similar styling */}
    </>
  );
}

export default IndexPage;
