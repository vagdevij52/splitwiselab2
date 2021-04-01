import React from 'react';
import axios from 'axios';
import { useState, useRef, useContext} from "react";
import {Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom';
import '../../styles/signup.css';
import mainlogo from '../../assets/logo.png';
import { FormControl,Modal,Container,Row,Col,Image,Button, Form, FormLabel} from 'react-bootstrap';
import NavbarBeforeLogin from '../Navbar/NavbarBeforeLogin';
import RegistrationService from '../../components/services/RegistrationService';
import { storeRegUserData, userSelector } from '../../slices/registereduserSlice';

const SignupPage = (props) => {
  const dispatch = useDispatch()
  //const { posts, loading, hasErrors } = useSelector(userSelector);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[emailAlrdyErr, setEmailAlrdyErr] = useState("");
  const handleSignUp = (e) =>{
    //return <Redirect to='/dashboard' />
    // console.log("Calling Regsitration service");
    // RegistrationService(username,email,password)
    // .then((res)=>{
    //   if(res){
    //     return <Redirect to='/dashboard' />
    //   }
    // }).catch(err=>{
    //   console.log(err);
    // });
    e.preventDefault();
    axios.post("http://localhost:4000/api/users/signup", {
      username,
      email,
      password,
    })
    .then(response => {
      console.log("Res: "+response);
      if(response){
      console.log("Response from axios: "+JSON.stringify(response.data));
      var strRes = JSON.stringify(response.data);
      var data = JSON.parse(strRes);
      console.log(data.username);
      // var rusername = data.map(u => u.username);
      // var remail = data.map(u => u.email);
      console.log("calling user slice");
      dispatch(storeRegUserData(data.username,data.email));
      props.history.push("/dashboard");
      }
    }).catch(err=>{
      console.log("Error: "+err);
    });
    // console.log("calling user slice");
    // dispatch(storeRegUserData(username,email,password));
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

