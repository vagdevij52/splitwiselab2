import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, Navbar, Button,Image} from 'react-bootstrap';
import '../../styles/landing.css';
import backgroundimg from '../../assets/bgimg100.jpeg';
import NavbarBeforeLogin from '../Navbar/NavbarBeforeLogin';

 const landing = () => {
    return(
    <>
    <NavbarBeforeLogin />
        <body style={{marginTop:"-15px",width:"100%",height:"800px",backgroundImage: "url(" + backgroundimg + ")"}}>
        </body>
    </>
    );
}

export default landing;