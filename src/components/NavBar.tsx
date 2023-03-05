import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button"
import Link from "../utils/Link";
import Image from "next/image"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import UploadIcon from '@mui/icons-material/Upload';
import LoginIcon from '@mui/icons-material/Login'
import { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import axiosRequest from "../utils/axiosRequest";
import { useRouter } from "next/router";

interface NavbarProps {
  isFixed: boolean;
  color?: string;
}

export default function Navbar( { isFixed, color = '#FFFFFF' }: NavbarProps ) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState("");


  const router = useRouter();
  // const { id } = router.query;


  useEffect(() => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (accessToken !== null) {
      setIsLoggedIn(true)
      axiosRequest(`/api/editUser/me`, "GET").then((res) => {
        console.log(res);
        // if (id !== res.data.id) return router.push("/404");
        setAvatar(res.data.data.avatar);
        console.log(avatar);
        setId(res.data.data.id);
      });

    } else {
      setIsLoggedIn(false)

    }

  }, [])


  const removeToken = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
  }


  const [ fix, setFix ] = useState(false);

  const setFixed =() => {
    if (window.scrollY >= 410) {
      setFix(true)
    } else {
      setFix(false)
    }
  }

  useEffect(() => {
    if (isFixed && typeof window !== "undefined") {
      window.addEventListener("scroll", setFixed)
    }
    return () => {
      if (isFixed && typeof window !== "undefined") {
        window.removeEventListener("scroll", setFixed)
      }
    }
  }, [isFixed])


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const handleLogout = () => {
    removeToken();
    handleMenuClose();
  };
    const renderMenu = (

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {/* router.push(`/profile/${id}/Gallery`); */}
        <MenuItem onClick={handleMenuClose}>My Gallery</MenuItem>
        {/* router.push(`/profile/${id}/collection`); */}
        <MenuItem onClick={handleMenuClose}>My Collections</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>

      </Menu>
    );



  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
         <Avatar
            alt="Avatar"
            src={avatar}
            onClick={handleProfileMenuOpen}
            sx={{ width: 40, height: 40 }}
          />
         
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        > 
          <UploadIcon />
        </IconButton>
        <p>Upload</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        > 
          <LoginIcon />
        </IconButton>
        <p>Log In</p>
      </MenuItem>
    </Menu>
  );



  return (
    <Box 
      sx={{ flexGrow: 1}}
    >
      <AppBar 
        color='transparent'
        elevation={0}
        sx={{
          position: fix? "fixed" : "relative",
          bgcolor: fix? '#FFFFFF' : '',
        }}
      >       
        <Toolbar>
          {/* Logo  */}
          <Link
            href="/"
          >
            <Image src="/logo.jpg" 
              style={{ borderRadius:10}}
              alt="Fotopie_Logo"
              width={45}
              height={45}
            />
          </Link>
     
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml:2}}>
            
            <Link
              variant="h6"
              underline="none"
              href="/"
              sx={{ fontSize: 24, fontFamily: 'inherit',
                    color: fix? '#000000' : color,
                  }}
            >
              {"FotoPie"}         
            </Link>
          
          </Typography>


        <Box sx={{ flexGrow: 1 }} >
         </Box>
          <Box 
            sx={{
              display: { xs: 'none', md: 'flex'},
              flexGrow: 0.05,
              justifyContent: 'space-between'
              
            }}
          >



            {isLoggedIn ? (
            <Box
            sx={{
              display: { xs: 'none', md: 'flex'},
              flexGrow: 1,
              justifyContent: 'space-between'
              
            }}
            >
            {/* notifications */}
              <IconButton
                  size="large"
                  color="inherit"
                >
                  <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                  </Badge>
              </IconButton>

              {/* User Profile */}
              <Avatar
                alt="Avatar"
                src={avatar}
                onClick={handleProfileMenuOpen}
                sx={{ width: 40, height: 40 }}
              />

              <Button 
              variant="contained" 
              href='upload'
              sx={{
                bgcolor: fix ? "primary.main" : "gray",
              }}
              >
              Upload
              </Button>
            </Box>
            ):(

              <Button 
              variant="contained" 
              color="success"
              href="login"
              sx={{
                bgcolor: fix ? "#3CB371" : "white",
              }}   
              >
              Log In
              </Button>
            )}

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

    </Box>
  );
}


