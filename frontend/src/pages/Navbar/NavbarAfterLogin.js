import React from 'react';
import { useState, useRef, useContext} from "react";
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Nav, Navbar, Button, Dropdown, DropdownButton,Image} from 'react-bootstrap';
import mainlogo from '../../assets/logo.png';
import '../../styles/navbarafterlogin.css';



const NavbarAfterLogin = () => {

    const handleLogout = () => {

    }
return(
    <Navbar expand="lg">
            <Image style={{height:"70px",width:"70px",float:"left"}} classname="logo" src={mainlogo} />
            <Navbar.Brand><Nav.Link href="dashboard">Splitwise</Nav.Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Dropdown className="drpDownNav">
                <Image style={{height:"20px",width:"20px"}} classname="logo" roundedCircle  />
                <Dropdown.Toggle className="profile">
                {}
                {/* {username} */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item className="dropdownItem" href="profile">Your Account</Dropdown.Item>
                <Dropdown.Item className="dropdownItem" href="createnewgroup">Create a group</Dropdown.Item>
                <Dropdown.Item className="dropdownItem"href="landing" onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
);
}
export default NavbarAfterLogin;