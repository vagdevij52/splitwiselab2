import React from 'react';
import { useState, useRef, useContext} from "react";
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../styles/signup.css';
import mainlogo from '../../assets/logo.png';
import { FormControl,Modal,Container,Row,Col,Image,Button, Form, FormLabel} from 'react-bootstrap';
import NavbarBeforeLogin from '../LandingPage/NavbarBeforeLogin';
import RegistrationService from '../../components/services/RegistrationService';

const SignupPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[emailAlrdyErr, setEmailAlrdyErr] = useState("");
  const handleSignUp = (e) =>{
    RegistrationService(username,email,password).
    then((res)=>{
      if(res===200){
        return <Redirect to='/dashboard' />
      }
    }).catch(err=>{
      console.log(err);
    });
  }
    return(
      <>
      <NavbarBeforeLogin />
      <Row></Row>
      <Row></Row>
      <Row></Row>
      <br/><br/><br/><br/>
      <Row>
        <Col></Col>
        <Col></Col>
          <Col>
          <Image style={{height:"200px",width:"200px",float:"left"}} src={mainlogo} />
          </Col>
          <Col>
          <Row className="title">INTRODUCE YOURSELF</Row>
          <Form onSubmit={handleSignUp}>
            <Row className="name">Hi there! My name is</Row>
            <Row>
              <input
              type="text"
              name="username"
              value={username} 
              onChange={e=> setUsername(e.target.value)}
              autoCapitalize="off" 
              className="iuname"
              />
            </Row><br/>
            <Row><label style={{fontSize:"18px",color:"#353839"}}>Here’s my <strong>email Address</strong></label></Row>
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
            <Row><FormLabel style={{fontSize:"18px",color:"#353839"}}>And here’s my <strong>password</strong></FormLabel></Row>
            <Row>
              <input
              type="password"
              className="iemail"
              name="email"
              value={password} 
              onChange={e=> setPassword(e.target.value)}
              />
            </Row><br/><br/>
            <Row>
              <input
              type="submit"
              value="Sign me up!"
              className="submitBtn"
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

export default SignupPage;

