import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import addExpenseDesc from '../../assets/addExpenseDesc.png';
import '../../styles/groups.css';
import {Image} from 'react-bootstrap';
import { useState } from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Form,Modal,Container,Row, Col} from 'react-bootstrap';
import NavbarAfterLogin from '../Navbar/NavbarAfterLogin';
import {  useSelector,useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

 const  GroupCenterColumn = props =>{
    const classes = useStyles();

    const storeusername = useSelector((state) => state.loggedReducer.username);

     console.log(props)
     const gName = props.location.state;
     //const noOfPplInGrp = 0;
     console.log("Gname: "+gName);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[billDesc,setBillDesc] = useState("");
    const[billAmount,setBillAmount] = useState("");
    const[noOfPplInGrp, setnoOfPplInGrp] = useState("");
    const[PplInGrp, setPplInGrp] = useState("");
    const[fields, setFields] = useState([]);

    const[billAddedMsg,setBillAddedMsg] = useState("");


    const handleModalValues = () =>{
        setBillAddedMsg("");
        console.log("calling addBillDetails API");
        var authorEmail = storeusername.email;
        axios.post('http://localhost:4000/api/group/addBillDetails',{
            billDesc,
            billAmount,
            authorEmail,
            gName,
        }).then((response)=>{
           if(response.status===200){
               console.log("Bill added successfully");
                var lent = (billAmount/noOfPplInGrp)*(noOfPplInGrp-1);
                setBillAddedMsg("You paid: "+billAmount+" You lent: "+lent);
           } 
        }).catch(err=>{
            console.log(err);
        });
    }

         return(
             <>
                <Container fluid="md">
                    <Col>
                    <Row>
                    <Card className={classes.root}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Group
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {gName}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button style={{borderColor:"#ccc",padding:"6px 10px",fontSize:"15px",float:"right",background:"#ff652f",color:"#fff",fontWeight:"bold",borderRadius:"7px"}} variant="primary" onClick={handleShow}>
                        Add an expense
                    </Button>
                </CardActions>
                </Card>
                    </Row>
                    </Col>
                </Container>
            </>
            )

         }
 

 export default GroupCenterColumn;