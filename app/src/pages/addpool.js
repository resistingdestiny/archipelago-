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
  Typography, Checkbox, FormControlLabel, FormGroup,
  Collapse,  Select, MenuItem,
} from '@mui/material';


import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SelectLocationMap from 'components/MapSelect'
import { DatePicker, LocalizationProvider, MobileDatePicker, DesktopDatePicker, CalendarPicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const riskSliderStyles = makeStyles((theme) => ({
  riskSlider: {
    height: 8,
    borderRadius: 4,
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-track': {
      border: 'none',
      borderRadius: 4,
      background: 'linear-gradient(to right, #00e676, #ff1744)', // Correct gradient
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      boxShadow: 'inherit',
    },
  },
  riskLabel: {
    display: 'block',
    textAlign: 'left',
    marginTop: theme.spacing(1),
  },
}));

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
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [token, setToken] = useState("");
  const mapContainerRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const handleCheckboxChange = (event) => {
    setApplyForUNFund(event.target.checked);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };
  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
  };
  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
  };
  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setOpen(true); 
    console.log(location, radius);
  };


  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };
  const riskSliderClasses = riskSliderStyles();
  const estimatedPremiums = 10
  const estimatedRisk = 10
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

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
              <Typography gutterBottom>Start Date:</Typography> 
      <DatePicker
        value={startDate}
        onChange={(newStartDate) => handleStartDateChange(newStartDate)}
        renderInput={(props) => <TextField {...props} />}
      />
      <Typography gutterBottom>End Date:</Typography> 
      <DatePicker
        value={endDate}
        onChange={(newEndDate) => handleEndDateChange(newEndDate)}
        renderInput={(props) => <TextField {...props} />}
      />
      <Typography gutterBottom>Select Token for Collateral:</Typography> 
      <Select
        labelId="token-select-label"
        id="token-select"
        value={token}
        variant="outlined"
        onChange={handleTokenChange}
      >
        <MenuItem value={'ETH'}>ETH</MenuItem>
        <MenuItem value={'BTC'}>BTC</MenuItem>
        <MenuItem value={'DOT'}>DOT</MenuItem>
        <MenuItem value={'ADA'}>ADA</MenuItem>
      </Select>
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
               Calculate
              </Button>
              <Collapse in={open} timeout="auto" unmountOnExit>
              <Typography variant="subtitle1">
                Estimated Premiums: {estimatedPremiums}
              </Typography>
              <Typography variant="subtitle1">
                Estimated Risk: {estimatedRisk}
              </Typography>
              
              <Slider
            aria-label="Estimated Risk Level"
            defaultValue={10}
            value={10}
            aria-labelledby="risk-slider"
            valueLabelDisplay="auto"
            step={null}
            marks={[{ value: 10, label: '' }]} 
            className={riskSliderClasses.riskSlider} 
          />
      <Typography variant="caption" className={riskSliderClasses.riskLabel}>
            10% chance estimated risk.
          </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => console.log('Submitting...')}  // replace with your data submission function
                className={classes.formField}
              >
                Submit
              </Button>
            </Collapse>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
    </LocalizationProvider>

  );

}

export default AddPoolPage;
