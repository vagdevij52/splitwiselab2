import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import mainlogo from '../../assets/logo.png';
import {Nav, Navbar, Button,Image} from 'react-bootstrap';
import '../../styles/landing.css';


const NavbarBeforeLogin = () => {
    return(
        <Navbar expand="lg">
        <Image style={{height:"70px",width:"70px",float:"left"}} src={mainlogo} />
            <Navbar.Brand><Nav.Link href="/">Splitwise</Nav.Link></Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="login" className="loginBtn">Login</Link>
                    <div className="divider"/>
                    <Link to="signup" className="signupBtn">Sign up</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarBeforeLogin;