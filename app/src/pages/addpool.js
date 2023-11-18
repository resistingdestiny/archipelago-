import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Slider,
  Typography, Checkbox, FormControlLabel, FormGroup
} from '@mui/material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SelectLocationMap from 'components/MapSelect'


const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  mapContainer: {
    height: '200px',
    marginBottom: theme.spacing(2), // Add space below the map
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
  formContainer: {
    padding: theme.spacing(3),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
   pageContainer: {
    marginTop: theme.spacing(4),
  },
  
}));

function AddPoolPage() {
  const classes = useStyles();
  const [applyForUNFund, setApplyForUNFund] = useState(false);

  const mapContainerRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const handleCheckboxChange = (event) => {
    setApplyForUNFund(event.target.checked);
  };


  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(location, radius);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  return (
    <Box className={classes.pageContainer}>
      <Container maxWidth="md">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4" className={classes.title}>
              Add New Pool
            </Typography>
            <form onSubmit={handleFormSubmit} className={classes.formContainer}>
              <TextField
                required
                fullWidth
                id="amount-needed"
                label="Amount Needed"
                variant="outlined"
                className={classes.formField}
              />
              <TextField
                required
                fullWidth
                id="risk"
                label="Risk"
                variant="outlined"
                className={classes.formField}
              />
              <Typography gutterBottom>Radius (km): {radius}</Typography>
              <Slider
                value={radius}
                onChange={handleRadiusChange}
                aria-labelledby="radius-slider"
                valueLabelDisplay="auto"
                min={1}
                max={30}
                className={classes.formField}
              />
            <div className={classes.mapContainer}>
              <SelectLocationMap
                onLocationSelect={handleLocationSelect}
                radius={radius}
              />
                </div> 
             
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.formField}
              >
                Submit Pool
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AddPoolPage;
