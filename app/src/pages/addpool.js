import React, { useState, useEffect, useMemo } from 'react';
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
import Web3 from "web3";
import { ethers } from "ethers";
import {approveInsuranceContract} from "../util/contract";
import {useSigner} from "wagmi";
import { ERC20_abi } from "../util/contract";

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SelectLocationMap from 'components/MapSelect'
import { DatePicker, LocalizationProvider, MobileDatePicker, DesktopDatePicker, CalendarPicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
const provider = new ethers.providers.JsonRpcProvider(
  "https://goerli.gateway.tenderly.co"
);



const contractAddress = "0x4dFf164AbE5B75018bA8f5b9f7166aCcc4C12406";
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_uniswapPool",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "policyId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "commitFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_limit",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_region",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "longitude",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "latitude",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "radius",
              "type": "uint256"
            }
          ],
          "internalType": "struct InsurancePolicyContract.Location",
          "name": "_location",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "end",
              "type": "uint256"
            }
          ],
          "internalType": "struct InsurancePolicyContract.Period",
          "name": "_coverPeriod",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "_probability",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_poolType",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_requestFundFromUNICEF",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_premium",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_denomination",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_acceptedTokens",
          "type": "address[]"
        }
      ],
      "name": "createInsurancePolicy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllPolicies",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "region",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "longitude",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "latitude",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "radius",
                  "type": "uint256"
                }
              ],
              "internalType": "struct InsurancePolicyContract.Location",
              "name": "location",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "start",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "end",
                  "type": "uint256"
                }
              ],
              "internalType": "struct InsurancePolicyContract.Period",
              "name": "coverPeriod",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "probability",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "poolType",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "requestFundFromUNICEF",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "premium",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fundsCommitted",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "denomination",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "acceptedTokens",
              "type": "address[]"
            }
          ],
          "internalType": "struct InsurancePolicyContract.InsurancePolicy[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "insurancePolicies",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "limit",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "region",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "longitude",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "latitude",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "radius",
              "type": "uint256"
            }
          ],
          "internalType": "struct InsurancePolicyContract.Location",
          "name": "location",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "end",
              "type": "uint256"
            }
          ],
          "internalType": "struct InsurancePolicyContract.Period",
          "name": "coverPeriod",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "probability",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "poolType",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "requestFundFromUNICEF",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "premium",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fundsCommitted",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "denomination",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextPolicyId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "uniswapPool",
      "outputs": [
        {
          "internalType": "contract IUniswapV3Pool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  
    
  const contractFunctionName = 'createInsurancePolicy'; // Function to call
  const toIntegerLatLong = (num) => {
    return Math.round(num * 1e6); // Multiply by 1e6 to convert to an integer
  };
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
  const [stakingTokenAddress, setStakingTokenAddress] = useState("0xc0A7F1B0c9988FbC123f688a521387A51596da47");

  const {data: signer, isError, isLoading} = useSigner();

  const [formData, setFormData] = useState({
    limit: "100000",
    region: "BenAss",
    longitude: "10",
    latitude: "10",
    radius: "10000",
    startPeriod: "1700305970",
    endPeriod: "1700306970",
    probability: "900",
    poolType: "Flood",
    requestFundFromUNICEF: false,
    premium: "100",
    denomination: "0xf2B719136656BF21c2B2a255F586afa34102b71d",
    acceptedTokens: [
      "0xf2B719136656BF21c2B2a255F586afa34102b71d",
      "0xf2B719136656BF21c2B2a255F586afa34102b71d"
    ]
  });
 const [contractArgs, setContractArgs] = useState([]);

  useEffect(() => {
    setContractArgs([
      ethers.BigNumber.from(formData._limit || "100000"),
      formData._region || "BenAss",
      [
        ethers.BigNumber.from(toIntegerLatLong(formData.longitude) || "10"),
        ethers.BigNumber.from(toIntegerLatLong(formData.latitude) || "10"),
        ethers.BigNumber.from(formData._location?.radius || "10000")
      ],
      [
        ethers.BigNumber.from(formData._coverPeriod?.start || "1700305970"),
        ethers.BigNumber.from(formData._coverPeriod?.end || "1700306970")
      ],
      ethers.BigNumber.from(formData._probability || "900"),
      formData._poolType,
      formData._requestFundFromUNICEF !== undefined ? formData._requestFundFromUNICEF : true,
      ethers.BigNumber.from(formData._premium || "100"),
      formData._denomination || "0xf2B719136656BF21c2B2a255F586afa34102b71d",
      formData._acceptedTokens || [
        "0xf2B719136656BF21c2B2a255F586afa34102b71d",
        "0xf2B719136656BF21c2B2a255F586afa34102b71d"
      ]
    ]);
  }, [formData]);

console.log('contractargs', contractArgs)

const tokens = {
  "Goerli": {
    "COCCCK": "0xd5732321a56d5Eb76e86CEB9D91De950060C3Ba4"
  },
  "Ethereum": {
    "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  }
};
const [selectedToken, setSelectedToken] = useState('');


  
  const classes = useStyles();
  const [applyForUNFund, setApplyForUNFund] = useState(false);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [token, setToken] = useState("");
  //const mapContainerRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const handleCheckboxChange = (event) => {
    setApplyForUNFund(event.target.checked);
    setFormData((prevFormData) => ({
      ...prevFormData,
      requestFundFromUNICEF: event.target.checked
    }));
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };
  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      startPeriod: newStartDate ? newStartDate.getTime().toString() : ""
    }));
  };
  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      endPeriod: newEndDate ? newEndDate.getTime().toString() : ""
    }));
  };
  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
    setFormData(prevFormData => ({
      ...prevFormData,
      radius: newValue.toString()
    }));
  };

  const handleCalculate = async (event) => {
    event.preventDefault();
    setContractArgs([
      ethers.BigNumber.from(formData.limit),
      formData.region ,
      [
        ethers.BigNumber.from(toIntegerLatLong(formData.longitude)),
        ethers.BigNumber.from(toIntegerLatLong(formData.latitude)),
        ethers.BigNumber.from(formData.radius )
      ],
      [
        ethers.BigNumber.from(formData.startPeriod || "1700305970"),
        ethers.BigNumber.from(formData.endPeriod || "1700306970")
      ],
      ethers.BigNumber.from(formData.probability || "900"),
      formData.poolType,
      formData.requestFundFromUNICEF !== undefined ? formData.requestFundFromUNICEF : true,
      ethers.BigNumber.from(formData.premium || "100"),
      formData.denomination || "0xf2B719136656BF21c2B2a255F586afa34102b71d",
      formData.acceptedTokens || [
        "0xf2B719136656BF21c2B2a255F586afa34102b71d",
        "0xf2B719136656BF21c2B2a255F586afa34102b71d"
      ]
    ]);
                             
        setOpen(true);                           
     
  };
  
  // Prepare contract write configuration
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: contractFunctionName,
    args: contractArgs,
  });
  console.log('config', config)

  // useContractWrite hook with the prepared config
  const { write } = useContractWrite(config);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Update contractArgs with the form data
   
    let gasAcceptPrice = await signer.getGasPrice();

    try {
      await approveContract.approve(contractAddress, ethers.BigNumber.from('10000000000000000'),  {
        gasLimit: 300000,
        gasPrice: gasAcceptPrice.mul(1),
      });  
      if (write) {
        const tx = await write();
        console.log('Transaction initiated:', tx);
      } else {
        console.log('death', config)
        console.error('Contract write function is not available');
      }
    } catch (error) {
      console.error('Error executing contract write:', error);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  
    setFormData(prevFormData => ({
      ...prevFormData,
      longitude: selectedLocation.longitude.toString(),
      latitude: selectedLocation.latitude.toString()
    }));
  };
// Update the formData state when 'Amount Needed' input changes
const handleAmountNeededChange = (event) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    limit: event.target.value             
  }));
};
function handleChange(event) {
  setSelectedToken(event.target.value);
  setStakingTokenAddress(event.target.value); // Update the staking token address state
  setFormData({ ...formData, denomination: event.target.value });
}

// Update the formData state when 'Risk' input changes
const handleRiskChange = (event) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    poolType: event.target.value
  }));
};
const approveInsuranceContract = new ethers.Contract(stakingTokenAddress, ERC20_abi, provider); 
  const approveContract = approveInsuranceContract.connect(signer);


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
                onChange={handleAmountNeededChange} 
              />
              <TextField
                required
                fullWidth
                id="risk"
                label="Risk"
                variant="outlined"
                className={classes.formField}
               onChange={(e) => setFormData({ ...formData, poolType: e.target.value })}

               
              />
              <TextField
                required
                fullWidth
                id="region"
                label="Region"
                variant="outlined"
                className={classes.formField}
               onChange={(e) => setFormData({ ...formData, region: e.target.value })}

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
  value={selectedToken}
  onChange={handleChange}
  variant="outlined"
  label="Token for Collateral"
>
  {Object.entries(tokens).map(([network, tokens]) =>
    Object.entries(tokens).map(([name, address]) => (
      <MenuItem key={address} value={address}>
        {network} - {name}
      </MenuItem>
    ))
  )}
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
                <FormControlLabel
  control={
    <Checkbox
      checked={applyForUNFund}
      onChange={handleCheckboxChange}
      inputProps={{ 'aria-label': 'Request fund from UN?' }}
    />
  }
  label="Apply for funding from UN?"
  className={classes.formField}
/>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleCalculate}
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
                onClick={handleFormSubmit}  // replace with your data submission function
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
