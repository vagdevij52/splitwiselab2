import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import '../../styles/dashboard.css';
import mainlogo from '../../assets/logo.png';
import settleuplogo from '../../assets/settleup.jpeg';
import {Nav, Navbar, Dropdown, DropdownButton} from 'react-bootstrap';
import styled from 'styled-components';
import {Redirect} from 'react-router';
import { useState, useContext } from 'react';
import {useEffect ,setState} from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import NavbarAfterLogin from '../Navbar/NavbarAfterLogin';
import {  useSelector,useDispatch } from 'react-redux';
import logged from '../../actions/loginActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';

const Styles = styled.div`
    .navbar{
        background-color: #1CC29F;
    }
    .navbar-brand{
        color: #ffffff;
        padding: 4.5px 20px 8.5px;
        float: left;
        margin-left: -20px;
        padding: 4px 20px 2px;
        line-height: 1;
        font-size:30px;
        font-weight: 500;
        font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;

        .nav-link{
            color: #ffffff;
        }
    }
    .nav-item .nav-link{
        color: #ffffff;
    }
    .profile{
        color: #ffffff;
        background: #5bc5a7;
        font-weight: 700;
        font-size: 15px;
        border-color: #ccc;
        border-radius: 5px;
    }
    .divider{
        width:5px;
    }

    .dropdownItem{
        font-size: 13px
    }
    .dropdownItem:hover{
        background-color:#5bc5a7;
        color: white;
    }
    
`;

const DashboardPage = (props) => {
    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
    const[totalBalance, setTotalBalance] = useState("");
    const[youOwe, setYouOwe] = useState("");
    const[youAreOwed, setYouAreOwed] = useState("");
    const[youOweEmailSummary, setYouOweEmailSummary] = useState([]);
    const[youOweCreditSummary, setYouOweCreditSummary] = useState([]);
    const[youAreOwedEmailSummary, setYouAreOwedEmailSummary] = useState([]);
    const[youAreOwedCreditSummary, setYouAreOwedCreditSummary] = useState([]);
    const[selectModalVal,setSelectModalVal] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const storeusername = useSelector((state) => state.loggedReducer.username);
    const dispatch = useDispatch();

        var emailsList = [];
        var creditList = [];
        var emailsListOwed = [];
        var creditListOwed = [];

        useEffect(() =>{
        const onLoadShowDashboard = () => {
            var user = JSON.parse(localStorage.getItem("user"));
            var username = user.username;
            dispatch(logged(username));
            const requestOptions = {
                method: 'GET',
               headers: { 'Content-Type': 'application/json' ,'Authorization': token},
              }
            axios.get("http://localhost:4000/api/billtransactions/youOwe",requestOptions)
            .then((response) =>{
                var x = Math.floor((response.data[0].sum) * 100) / 100;
                x.toFixed(2);
                console.log("You Owe: "+x);
                if(response.status===200){
                    setYouOwe(x);
                }
            }).catch(err=>{
                console.log(err);
            });


            axios.get("http://localhost:4000/api/billtransactions/youAreOwed",requestOptions)
            .then((response) =>{
                var x = Math.floor((response.data[0].sum) * 100) / 100;
                x.toFixed(2);
                console.log("You Are Owed: "+x);
                if(response.status===200){
                    console.log("sum: "+x);
                    setYouAreOwed(x);
                }
            }).catch(err=>{
                console.log(err);
            });

            // // you owe summary
            // axios.post(API_URL + 'getyouowesummary', {
            //     email,
            // }).then((response)=>{
            //     console.log("You owe summary: "+response.data);
            //     var strRes = JSON.stringify(response.data);
            //     console.log(strRes);
            //     var data = JSON.parse(strRes);
            //     for(var i=0;i<data.length;i++){
            //         console.log("Data frm back:::: "+JSON.stringify(data[i]["authorEmail"]) +" "+JSON.stringify(data[i]["credit"]));
            //         var creditdata = {};
            //         creditdata.email = data[i]["authorEmail"];
            //         creditdata.credit = data[i]["credit"];
            //         emailsList.push(data[i]["authorEmail"]);
            //         creditList.push(creditdata);
            //     }
            //     console.log(creditList);
            //     setYouOweEmailSummary(emailsList);
            //     setYouOweCreditSummary(creditList);

            //     console.log("youOweEmailSummary length:"+youOweEmailSummary.length);
            //     console.log("youOweEmailSummary length:"+youOweCreditSummary.length);
            // });

            // // you are owed summary
            // axios.post(API_URL + 'getyouareowedsummary', {
            //     email,
            // }).then((response)=>{
            //     console.log("You are owed summary: "+response.data);
            //     var strRes = JSON.stringify(response.data);
            //     console.log(strRes);
            //     var data = JSON.parse(strRes);
            //     for(var i=0;i<data.length;i++){
            //         console.log("Data frm back:::: "+JSON.stringify(data[i]["userEmail"]) +" "+JSON.stringify(data[i]["credit"]));
            //         var creditdata = {};
            //         creditdata.email = data[i]["userEmail"];
            //         creditdata.credit = data[i]["credit"];
            //         emailsListOwed.push(data[i]["userEmail"]);
            //         creditListOwed.push(creditdata);
            //     }
            //     console.log(creditListOwed);
            //     setYouAreOwedEmailSummary(emailsListOwed);
            //     setYouAreOwedCreditSummary(creditListOwed);

            //     console.log("youOweEmailSummary length:"+youAreOwedEmailSummary.length);
            //     console.log("youOweEmailSummary length:"+youAreOwedCreditSummary.length);
            // });

            // console.log(youAreOwed-youOwe);
            // setTotalBalance(youAreOwed-youOwe);
             
        }
        onLoadShowDashboard();
        },[]);


        const handleSettleUp = (e) =>{
            // console.log(e.target.value+" clicked");
            // console.log("selectModalVal: "+ selectModalVal);
            // var useremail = selectModalVal;
            // axios.post(API_URL + 'settleup', {
            //     selectModalVal,
            //     email,
            // }).then((response)=>{
            //     console.log("You are owed: "+response.data);
            //     setYouAreOwed(response.data);
            // });
        }

        const handleSelect=(e)=>{
            console.log("setSelectModalVal::::: "+e);
            setSelectModalVal(e);
          }

        var tb = youAreOwed-youOwe;
    return(
    <body>
        <>
        <NavbarAfterLogin/>
        <h1 style={{color:"#5bc5a7",marginLeft:"5px"}}>Hey {storeusername}</h1>
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
                {/* <div>
                    <Link onClick={handleSettleUp} className="settleUpBtn">Settle up</Link>
                </div> */}
                {/* <hr className="blockhrLineDash"></hr> */}
                <Row>
                <Button
                variant="contained"
                onClick={handleShow}
                color="#5bc5a7"
                style={{marginLeft:"480px",background:"#5bc5a7",color:"#ffffff",fontWeight:"bold",float:"right",fontSize:"13px"}}
                // className={classes.button}
                startIcon={<CheckCircleIcon />}
                >
                    Settle up
                </Button>
                </Row>

                <Modal style={{opacity:5}} show={show} onHide={handleClose} centered>
                <Modal.Header style={{background:"#5bc5a7"}} closeButton>
                <Modal.Title style={{fontWeight:"bold"}}>Settle up</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Container>
                <Row>
                <Image style={{height:"30px",width:"30px"}}classname="logo" src={settleuplogo} />
                <Col style={{fontWeight:"bold",fontSize:"13px",borderRadius:"10px"}} xs={12} md={8}>
                <Form.Group>
                <Row>
                <Col></Col>
                <Col>You owe :</Col>
                <Col>   
                <Dropdown>
                {/* <Dropdown.Toggle style={{background:"#5bc5a7",width:"100px"}} id="dropdown-basic">
                Select person
                </Dropdown.Toggle> */}
                <DropdownButton title = "Select person" onSelect = {handleSelect}>
                {youOweCreditSummary.map(credit => 
                <Dropdown.Item style={{color:"#353839",fontSize:"20px"}}
                eventKey={credit.email}
                //onClick={e=> setSelectModalVal(e.target.value)}
                >
                {credit.email}
                </Dropdown.Item>
                )}
                {/* <Dropdown.Item style={{color:"#353839",fontSize:"20px"}}>
                {youOweCreditSummary.map(credit => (
                    <p>{credit.email}</p>
                ))}
                </Dropdown.Item> */}
                </DropdownButton>
                </Dropdown>
                </Col>
                </Row>     
                </Form.Group>
                </Col>
                </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button style={{color: "black",background: "#ffffff",borderRadius: "5px",fontSize:"13px"}} onClick={handleClose}>
                    Close
                </Button>
                <Button style={{color: "#ffffff",background: "#5bc5a7",borderRadius: "5px",fontSize:"13px"}} onClick={handleSettleUp} >
                    Settle
                </Button>
                </Modal.Footer>
                </Modal>

                <div>
                    <Row>
                    {/* <span style={{marginLeft:"10px"}} /> */}
                    <Col><p style={{marginLeft:"10px"}} className="dashboardBlockTwo">total balance: {tb}</p></Col>
                    <Col><p style={{marginLeft:"50px"}} className="dashboardBlockTwo">you owe: {youOwe}</p></Col>
                    <Col><p style={{marginLeft:"40px"}} className="dashboardBlockTwo">you are owed: {youAreOwed}</p></Col>
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
    </body>
    )
}

 export default DashboardPage;