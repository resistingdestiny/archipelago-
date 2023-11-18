import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import Section from "components/Section";
import { useTheme } from "@mui/styles";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';



function Navbar2(props) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Predicted loss', read: false },

    { id: 3, message: 'Cover activated', read: true },
  ]);
  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && theme.name === "dark"
      ? props.logoInverted
      : props.logo;

      const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      
      const handleNotificationClose = () => {
        setAnchorEl(null);
      };
      
      const handleMarkAsRead = (notificationId, message) => {
        setNotifications(notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        ));
      
      };

  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
          <Link href="/" passHref>
              <a style={{ color: "inherit", textDecoration: "none" }}>
                <Typography variant="h6" color="inherit">
                  Archipelago
                </Typography>
              </a>
            </Link>
            <Box sx={{ ml: 2, display: { md: "block", xs: "none" } }}>
            <Link href="/yields" passHref={true}>
                <Button color="inherit" component="a">
                  Products
                </Button>
              </Link>
              <Link href="/portfolio" passHref={true}>
                <Button color="inherit" component="a">
                  Portfolio
                </Button>
              </Link>
              <Link href="/addpool" passHref={true}>
                <Button color="inherit" component="a">
                  Cover
                </Button>
              </Link>
             
              

            </Box>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              color="inherit"
              size="large"
              sx={{ ml: "auto", display: { md: "none", xs: "block" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", ml: "auto", mr: "10px", }}>
            
                    <ConnectButton/>
               
                

             

           
            </Box>
            <IconButton
    color="inherit"
    onClick={handleNotificationClick}
  >
    <Badge
      badgeContent={notifications.filter((notification) => !notification.read).length}
      color="error"
    >
      <NotificationsIcon />
    </Badge>
  </IconButton>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleNotificationClose}
  >
   {notifications.map((notification) => (
  <MenuItem
    key={notification.id}
    onClick={() => handleMarkAsRead(notification.id, notification.message)}
    sx={{ backgroundColor: notification.read ? "transparent" : theme.palette.action.selected }}
  >
    {notification.message === 'Predicted loss' ? (
      <Link href="/poolCover" passHref>
        <Typography component="a" style={{ textDecoration: 'none', color: 'inherit' }}>
          {notification.message}
        </Typography>
      </Link>
    ) : (
      <Typography>
        {notification.message}
      </Typography>
    )}
  </MenuItem>
))}
  </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      
    </Section>
  );
}

export default Navbar2;
