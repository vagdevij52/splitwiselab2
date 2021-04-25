import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import mainlogo from '../../assets/logo.png';
import '../../styles/dashboard.css';
//import '../../styles/groups.css';
import {Redirect} from 'react-router';
import { useState, useEffect ,setState} from 'react'
import { FormControl,Modal,Row, Col,Image} from 'react-bootstrap';
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const ExpenseComment = () =>{

    //const user = AuthService.getCurrentUser();
    //const userEmail = user.email;
    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;

    const inviteProcessed = 'Sent';
    const waitingInviteStatus = 'NoReply';
    const acceptGroupsInviteStatus = 'Accepted';
    const rejectGroupsInviteStatus = 'Rejected';

    const [paredObj, setParedObj] = useState([]);
    const [myGrpParedObj, setMyGrpParedObj] = useState([]);
    const[showMsg, setShowMsg] = useState("");
    const[showNoOtherGrpMsg, setShowNoOtherGrpMsg] = useState("");
    const[showNoMyGrpMsg, setShowNoMyGrpMsg] = useState("");

    return(
    <h1>Expense Comment</h1>
    );

}

export default ExpenseComment;