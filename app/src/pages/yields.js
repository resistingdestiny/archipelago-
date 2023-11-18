import React, { useState } from 'react';
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

const allProducts = [
  {
    name: 'R-STETH-EARN',
    balance: '870.04 STETH',
    capacity: '4,000.00 STETH',
    yield: '68.60%',
    description: 'Earn up to 68.60% APY with a principal protected vault strategy',
    tags: ['COVERED CALL', 'U2'], // Example tags array
  },
  // ... other products
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

  const filterProducts = (strategy, asset, sortBy) => {
   
    let filtered = allProducts;
    if (strategy) {
      filtered = filtered.filter(product => product.strategy === strategy);
    }
    if (asset) {
      filtered = filtered.filter(product => product.asset === asset);
    }


    setProducts(filtered); 
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
      <Box className={classes.filterContainer}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Strategy</InputLabel>
          <Select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            label="Strategy"
          >
           
            <MenuItem value="Strategy1">Strategy 1</MenuItem>
            <MenuItem value="Strategy2">Strategy 2</MenuItem>
            {/* ... other strategies */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Deposit Asset</InputLabel>
          <Select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            label="Deposit Asset"
          >
          
            <MenuItem value="Asset1">Asset 1</MenuItem>
            <MenuItem value="Asset2">Asset 2</MenuItem>
            {/* ... other assets */}
          </Select>
        </FormControl>

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
        <Typography className={classes.title}>{product.name}</Typography>
        <Typography className={classes.balance}>{product.balance} / {product.capacity}</Typography>
        <LinearProgress
          variant="determinate"
          value={product.utilization}
          className={classes.progress}
        />
        <Typography className={classes.yield}>{product.yield}</Typography>
        <Typography className={classes.description}>{product.description}</Typography>
        <Box className={classes.progressContainer}>
          <Typography>Current Deposits</Typography>
          <Typography>{product.currentDeposits}</Typography>
        </Box>
        <Box className={classes.progressContainer}>
          <Typography>Max Capacity</Typography>
          <Typography>{product.maxCapacity}</Typography>
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
        <Box mt={2} className={classes.button}> 
          <Button
            variant="contained" 
            className={classes.ctaButton}
            href="/pool"
          >
            Get Started
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
