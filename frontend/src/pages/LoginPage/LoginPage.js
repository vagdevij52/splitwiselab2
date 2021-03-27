import React from 'react';
import { useState, useRef, useContext} from "react";
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../styles/login.css';
import mainlogo from '../../assets/logo.png';
import { FormControl,Modal,Container,Row,Col,Image,Button, Form, FormLabel} from 'react-bootstrap';
import NavbarBeforeLogin from '../Navbar/NavbarBeforeLogin';
import RegistrationService from '../../components/services/RegistrationService';

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[emailAlrdyErr, setEmailAlrdyErr] = useState("");
  const handleLogIn = (e) =>{
    // RegistrationService(username,email,password).
    // then((res)=>{
    //   if(res===200){
    //     return <Redirect to='/dashboard' />
    //   }
    // }).catch(err=>{
    //   console.log(err);
    // });
    return <Redirect to='/dashboard' />
  }
    return(
      <>
      <NavbarBeforeLogin />
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Row>
        <Col></Col>
        <Col></Col>
          <Col>
          <Image style={{height:"200px",width:"200px",float:"left"}} src={mainlogo} />
          </Col>
          <Col>
          <Row className="titleLoginPage">WELCOME TO SPLITWISE</Row>
          <Form onSubmit={handleLogIn}>
            <Row><label style={{fontSize:"18px",color:"#353839"}}>Email address</label></Row>
            <Row>
              <input
              type="text"
              name="email"
              value={email} 
              onChange={e=> setEmail(e.target.value)}
              autoCapitalize="off" 
              className="iemail"
              />
            </Row>
            <div style={{color:"red", fontWeight:"bold"}}>{emailAlrdyErr}</div>
            <br/>
            <Row><FormLabel style={{fontSize:"18px",color:"#353839"}}>Password</FormLabel></Row>
            <Row>
              <input
              type="password"
              className="iemail"
              name="email"
              value={password} 
              onChange={e=> setPassword(e.target.value)}
              />
            </Row><br/><br/><br/><br/>
            <Row>
              <input
              type="submit"
              value="Log In"
              className="loginBtnInLogin"
              />
            </Row>
          </Form>
          </Col>
          <Col></Col>
          <Col></Col>
      </Row>
      </>
    );
}

export default LoginPage;

