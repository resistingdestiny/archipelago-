import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  Avatar,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { getAllVaults } from 'components/vaultsView';
import { useProvider } from "wagmi";




const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#121212',
    color: 'white',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  balance: {
    fontSize: 16,
    color: theme.palette.grey[500],
    marginBottom: theme.spacing(1),
  },
  yield: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  description: {
    fontSize: 14,
    color: theme.palette.grey[400],
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(1),
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.23)',
    '&.MuiChip-filled': {
      color: 'white',
      backgroundColor: '#333333',
    },
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  progress: {
    flexGrow: 1,
    height: 10,
    borderRadius: 5,
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#BB86FC',
    },
  },
  filterContainer: {
    backgroundColor: '#121212',
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center', // Center the filter container
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  cardContainer: {
    marginTop: theme.spacing(2), // Add space above the card container
    marginBottom: theme.spacing(4), // Add space below the cards
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#121212', 
    minHeight: '100vh',
    color: 'white',
  },
  card: {
    minHeight: '500px',
    background: 'rgba(25, 25, 25, 0.9)', // Semi-transparent dark card background
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid #333', // Border for cards
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      border: '1px solid transparent',
      borderRadius: '15px',
      background: 'linear-gradient(45deg, rgba(140, 58, 255, 0.1), rgba(73, 63, 252, 0.1))',
      zIndex: 1,
      pointerEvents: 'none',
    },
    transition: 'box-shadow 0.3s', // Smooth transition for the glow effect
    '&:hover': {
      boxShadow: `0 0 10px 0 rgba(140, 58, 255, 0.5), 0 0 20px 0 rgba(140, 58, 255, 0.3), 0 0 30px 15px rgba(140, 58, 255, 0.2)`, // Glowing purple shadow
    },
  },
  cardContent: {
    zIndex: 2,
  },
  neonEffect: {
    textShadow: '0 0 5px #9c27b0, 0 0 15px #9c27b0, 0 0 30px #9c27b0, 0 0 60px #9c27b0',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    borderColor: '#9c27b0',
    color: '#9c27b0',
  
  },
  formControl: {
    minWidth: 120,
    color: 'white',
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
  },
  iconButton: {
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
}));
const createQueryString = (product) => {
  const queryParams = new URLSearchParams();
  queryParams.append('name', product.name);
  queryParams.append('balance', product.balance);
  queryParams.append('capacity', product.capacity);
  queryParams.append('yield', product.yield);
  queryParams.append('utilization', product.utilization);
  queryParams.append('address', product.vaultAddress);

  queryParams.append('poolType', product.poolType);
  queryParams.append('risk', product.risk);
  queryParams.append('description', product.description);
  queryParams.append('image', product.image);
  product.tags.forEach((tag, index) => queryParams.append(`tag${index}`, tag));
  return queryParams.toString();
};

const allProducts = [
  {
    name: 'Global Tsunami',
    balance: '20 GETH',
    capacity: '100 GETH',
    yield: '18.60%',
    utilization: '20',
    poolType: 'tsunami',
    vaultAddress: "0xC62F0c7D0fcb9FC62D128906d405Aa86A4737300",
    symbol: "aGTP",
    risk: 10, 
    description: 'Earn between 10-20% APY protecting the world from Tsunamis',
    tags: ['Natural Catastrophe', 'Water', 'Global'], 
    image: 'images/tsunami.png'
  },
  {
    name: 'Global Hurricane',
    balance: '20 GETH',
    capacity: '100 GETH',
    yield: '8%',
    utilization: '20',
    poolType: 'hurricane',
    risk: 20,
    symbol: "aGHP",
    vaultAddress: "0x9e9ee7CE0125dE7Dca425Ed192336390fEee1b04",
    description: 'Earn between 5-10% APY protecting the world from Hurricanes',
    tags: ['Natural Catastrophe', 'Hurricanes', 'Global'], 
    image: 'images/hurricane.png'
  },
  {
    name: 'Turkish Earthquake',
    balance: '20 GETH',
    capacity: '100 GETH',
    yield: '6%',
    utilization: '20',
    poolType: 'earthquake',
    risk: 30,
    symbol: "aTEP",
    vaultAddress: "0xc53A060aa339992d3E5A69258211aa64F9B8891", 
    description: 'Earn between 5-10% APY protecting Turkey from Earthquakes',
    tags: ['Natural Catastrophe', 'Earthquake', 'Regional'], 
    image: 'images/earthquake.png'
  },
];
function DashboardPage(props) {
  const classes = useStyles();
  const [strategy, setStrategy] = useState('');
  const [asset, setAsset] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [products, setProducts] = useState(allProducts); // State to store filtered products

  const handleStrategyChange = (event) => {
    setStrategy(event.target.value);
    filterProducts(event.target.value, asset, sortBy);
  };

  const handleAssetChange = (event) => {
    setAsset(event.target.value);
    filterProducts(strategy, event.target.value, sortBy);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    filterProducts(strategy, asset, event.target.value);
  };

  const parseYield = (yieldStr) => {
    return parseFloat(yieldStr.replace('%', ''));
  };

 
  const filterProducts = (strategy, asset, sortBy) => {
   
    let filtered = allProducts;
    if (strategy) {
      filtered = filtered.filter(product => product.strategy === strategy);
    }
    if (asset) {
      filtered = filtered.filter(product => product.asset === asset);
    }
    if (sortBy === 'HighestYield') {
      filtered.sort((a, b) => parseYield(b.yield) - parseYield(a.yield));
    } else if (sortBy === 'LowestRisk') {
      filtered.sort((a, b) => a.risk - b.risk); // Assuming 'risk' is a numeric value
    }


    setProducts(filtered); 
  };
  const provider = useProvider();

  const [vaults, setVaults] = useState ('')
  console.log(vaults)
  useEffect(() => {
   
      getAllVaults(provider)
        .then(data => setVaults(data))
        .catch(error => console.error("Error fetching policies:", error));
  
    
  }, [provider]);
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
      <Box className={classes.filterContainer}>
      

    

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
      
            <MenuItem value="HighestYield">Highest Yield</MenuItem>
            <MenuItem value="LowestRisk">Lowest Risk</MenuItem>
           
          </Select>
        </FormControl>

        <IconButton className={classes.iconButton}>
          <ViewModuleIcon />
        </IconButton>
      </Box>
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                     

               <Card className={classes.card}>
      <CardContent>
      <Box display="flex" justifyContent="center" mb={1} alignItems="center">
                    <img src={product.image} alt="Product" style={{ maxWidth: '50%', height: 'auto' }} />
                  </Box>
        <Typography className={classes.title}>{product.name}</Typography>
        <Typography className={classes.balance}>{product.balance} / {product.capacity}</Typography>
        <LinearProgress
          variant="determinate"
          value={product.utilization}
          className={classes.progress}
        />
        <Typography className={classes.yield}>{product.yield} APR</Typography>
        <Typography className={classes.description}>{product.description}</Typography>
        <Box className={classes.progressContainer}>
          <Typography>{product.symbol}</Typography>
         
          <Typography>Risk:</Typography>
          <Typography>{product.risk}%</Typography>
        </Box>
      
        <Box mt={2}>
          {product.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              className={classes.chip}
              avatar={<Avatar className={classes.avatar}>{/* tag icon */}</Avatar>}
            />
          ))}
        </Box>
        <Box mt={3} className={classes.button}> 
          <Button
            variant="contained" 
            className={classes.ctaButton}
            href={`/pool?${createQueryString(product)}`}

          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default DashboardPage;
