import React from 'react';
import { useState, useRef, useContext} from "react";
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FormControl,Modal,Container,Row,Col,Image,Button, Form, FormLabel} from 'react-bootstrap';
import NavbarAfterLogin from '../Navbar/NavbarAfterLogin';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import {Link} from 'react-router-dom';
import '../../styles/dashboard.css';

const DashboardPage = () => {

    const handleSettleUp = () => {
        console.log("Settle up called!");
    }
    return(
    <>
        <NavbarAfterLogin/>
        <br/><br/>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
        <LeftSideBar />
        </Col>
        <Col>
            <div className="dashboardBlock">
                <div>
                    <Link onClick={handleSettleUp} className="settleUpBtn">Settle up</Link>
                </div>
                <hr className="blockhrLineDash"></hr>
                <div>
                    <Row>
                    {/* <span style={{marginLeft:"10px"}} /> */}
                    <Col><p style={{marginLeft:"10px"}} className="dashboardBlockTwo">total balance</p></Col>
                    <Col><p style={{marginLeft:"50px"}} className="dashboardBlockTwo">you owe</p></Col>
                    <Col><p style={{marginLeft:"70px"}} className="dashboardBlockTwo">you are owed</p></Col>
                    </Row>
                    <Row>
                    {/* <span style={{marginLeft:"10px"}} /> */}
                    <Col><p style={{marginLeft:"10px"}} className="dashboardBlockTwo">$0.00</p></Col>
                    <Col><p style={{marginLeft:"50px"}} className="dashboardBlockTwo">$5.00</p></Col>
                    <Col><p style={{marginLeft:"70px"}} className="dashboardBlockTwo">$5.00</p></Col>
                    </Row>
                </div>
            </div>
            <div style={{height:"500px"}} className="dashboardBlock">
                <Row>
                <Col><p style={{marginLeft:"25px",color:"#414a4c",fontSize:"17px"}}>YOU OWE</p></Col>
                <p className="dashboardVerLine"></p>
                <Col><p style={{marginLeft:"130px",color:"#414a4c",fontSize:"17px"}}>YOU ARE OWED</p></Col>
                </Row>
            </div>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        </Row>
    </>
    );
}
export default DashboardPage;