import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent
} from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles((theme) => ({
  card: {
    background: 'rgba(39, 39, 42, 0.9)',
    borderRadius: '10px',
    color: 'white',
  },
  title: {
    fontWeight: 700,
  },
  performanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
  },
  // Define other styles needed for your component
}));

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const PerformanceChart = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box className={classes.performanceHeader}>
          <Typography variant="h6" className={classes.title}>Vault Performance</Typography>
          <ToggleButtonGroup
            size="small"
            exclusive
            color="primary"
          >
            <ToggleButton value="savax">SAVAX</ToggleButton>
            <ToggleButton value="usd">USD</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
