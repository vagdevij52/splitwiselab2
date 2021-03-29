import React from 'react';
import { useState, useRef, useContext} from "react";
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Nav, Navbar, Button, Dropdown, DropdownButton,Image} from 'react-bootstrap';
import mainlogo from '../../assets/logo.png';
import '../../styles/navbarafterlogin.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
      color:"white"
    },
    largeIcon: {
        width: 100,
        height: 100,
      },
  }));

const NavbarAfterLogin = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const handleLogout = () => {

    }
return(
    // <Navbar expand="lg">
    //         <Image style={{height:"60px",width:"70px",float:"left"}} classname="logo" src={mainlogo} />
    //         <Navbar.Brand><Nav.Link href="dashboard">Splitwise</Nav.Link></Navbar.Brand>
    //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //         <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="ml-auto">
    //             <Dropdown className="drpDownNav">
    //             <Image style={{height:"20px",width:"20px"}} classname="logo" roundedCircle  />
    //             <Dropdown.Toggle className="profile">
    //             {}
    //             {/* {username} */}
    //             </Dropdown.Toggle>

    //             <Dropdown.Menu>
    //             <Dropdown.Item className="dropdownItem" href="profile">Your Account</Dropdown.Item>
    //             <Dropdown.Item className="dropdownItem" href="createnewgroup">Create a group</Dropdown.Item>
    //             <Dropdown.Item className="dropdownItem"href="landing" onClick={handleLogout}>Logout</Dropdown.Item>
    //             </Dropdown.Menu>
    //             </Dropdown>
    //             </Nav>
    //         </Navbar.Collapse>
    //     </Navbar>

    // <AppBar>
    //     <ToolBar>
    //         <IconButton>
    //             <MenuIcon />
    //         </IconButton>
    //         <Typography variant="h6">
    //             Profile
    //         </Typography>
    //     </ToolBar>
    // </AppBar>

    <div className={classes.root}>
      <FormGroup>
        {/* <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        /> */}
      </FormGroup>
      <AppBar position="static" style={{background:"#5bc5a7"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             <Image rounded style={{width:"35px",height:"35px"}} src={mainlogo}
             />
            </IconButton>
            <Typography variant="h2" className={classes.title}>
              <Link style={{textDecoration:"none", color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, sans-serif"}} to="dashboard">Splitwise</Link>
            </Typography>
          {(
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                
              >
                <AccountCircle style={{fontSize:"30px"}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link} to='profile'>Your Account</MenuItem>
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link} to='createnewgroup'>Create a group</MenuItem>
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link} to='landing'>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
);
}
export default NavbarAfterLogin;