import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import mainlogo from '../../assets/logo.png';
import {Redirect} from 'react-router';
import { useState, useEffect ,setState} from 'react'
import { FormControl,Modal,Row, Col,Image} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';




const LoadOtherGroups = () =>{

    //const userEmail = user.email;
    const inviteProcessed = 'Sent';
    const waitingInviteStatus = 'NoReply';
    const acceptGroupsInviteStatus = 'Accepted';
    const rejectGroupsInviteStatus = 'Rejected';

    const API_URL = "http://localhost:3001/";
    const [paredObj, setParedObj] = useState([]);
    const [myGrpParedObj, setMyGrpParedObj] = useState([]);
    const[showMsg, setShowMsg] = useState("");
    const[showNoOtherGrpMsg, setShowNoOtherGrpMsg] = useState("");
    const[showNoMyGrpMsg, setShowNoMyGrpMsg] = useState("");

const handleAcceptGroupRequest = (grpName) => {
   console.log("Grp name:" +grpName);
    axios.post(API_URL + 'acceptgrouprequest',{
        acceptGroupsInviteStatus,
        //userEmail,
        grpName,
    })
    .then((response) =>{
        if(response.status === 200){
        setShowMsg("Congrats!You joined the group");
        console.log("Congrats!You joined the group: "+JSON.stringify(response.data));
        window.location.reload();
        }
    }).catch(err=>{
        console.log(err);
    });
}

const handleRejectGroupRequest = (grpName) => {
    console.log("Grp name:" +grpName);
    axios.post(API_URL + 'rejectgrouprequest',{
        rejectGroupsInviteStatus,
        //userEmail,
        grpName,
    })
    .then((response) =>{
        if(response.status === 200){
        console.log("Sorry to see you leave..."+JSON.stringify(response.data));
        setShowMsg("Sorry to see you leave...");
        window.location.reload();
        }
    }).catch(err=>{
        console.log(err);
    });
}
return(
                // <Container>
                //         <Row  style={{marginLeft:"20px"}}>
                //             <Row>
                //                 <h2>Your group requests</h2>
                //             </Row>
                //         </Row>
                //         <Row  style={{marginLeft:"20px"}}>
                //             <p style={{fontSize:"20px",color:"red",fontWeight:"bold"}}>{showNoOtherGrpMsg}</p>
                //             {paredObj.map(grp => (
                //             <Row>
                //              <p style={{paddingTop:"7px",marginLeft:"18px",color:"#5bc5a7",fontSize:"20px"}}>{grp.groupName}</p>
                //              <Link style={{color:"white",borderRadius:"5px",marginLeft:"400px",background:"#5bc5a7",fontSize:"20px"}}onClick={()=>handleAcceptGroupRequest(grp.groupName)}>Accept</Link>&nbsp;&nbsp;
                //              <Link style={{color:"white",borderRadius:"5px",background:"#ff652f",fontSize:"20px"}} onClick={()=>handleRejectGroupRequest(grp.groupName)}>Reject</Link>
                //             </Row>
                //             ))}
                //             {/* <p style={{fontSize:"10px",color:"#5bc5a7"}}>{showMsg}</p> */}
                //         </Row>
                // </Container>
                <Container>
                    <Row></Row>
                <Grid container>
                    <br/><br/>
                    <Grid item>
                        <Paper style={{ height:35 , width:900, background:"#ccc",fontSize:25,fontWeight:"bold"}}>
                            Group requests
                        </Paper>
                    </Grid>
                </Grid><br/>
                <Grid container spacing="2">
                    <Grid item>
                        <Paper style={{ height:40 , width:900, background:"#eee",fontSize:30}}>
                        <span style={{marginLeft:"7px",color:"#353839",fontSize:"23px"}}>Farewell party </span>
                        <Button size="large" fontSize="50" startIcon={<CancelIcon />} variant="contained" style={{fontWeight:"bold",backgroundColor:"#ff652f",color:"white",fontSize:"14px",float:"right"}}> Reject </Button>
                        <Button size="large" startIcon={<CheckIcon />} variant="contained" style={{fontWeight:"bold",backgroundColor:"#5bc5a7",color:"white",fontSize:"14px",float:"right"}}> Accept </Button>
                        </Paper>
                    </Grid>
                </Grid>
                </Container>
);
}

export default LoadOtherGroups;