import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import addExpenseDesc from '../../assets/addExpenseDesc.png';
import '../../styles/groups.css';
import {Image} from 'react-bootstrap';
import { useState ,useEffect} from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Form,Modal,Container,Row, Col} from 'react-bootstrap';
import NavbarAfterLogin from '../Navbar/NavbarAfterLogin';
import {  useSelector,useDispatch } from 'react-redux';
import GroupCenterColumn from './GroupCenterColumn';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ExpenseComment from './ExpenseComment';
import CustomizedListItem from './CustomizedListItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles({
    root: {
      minWidth: 800,
      height:130,
      backgroundColor:'#ccede4'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 10,
    },
    rightpanel: {
        fontSize: 15,
    },
    gName: {
        fontSize: 25,
        fontWeight:'bold'
      },
      
    // pos: {
    //   marginBottom: 12,
    // },
  });



 const  GroupPage = props =>{
    const [expanded, setExpanded] = React.useState('panel1');
    const billArray = [];
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    const storeusername = useSelector((state) => state.loggedReducer.username);
    const classes = useStyles();
    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;

     console.log(props)
     const groupName = props.location.state;
     //const noOfPplInGrp = 0;
     console.log("Gname: "+groupName);
    const [show, setShow] = useState(false);
    const [showPostCommentModal, setShowPostCommentModal] = useState(false);
    const[billDsc, setBillDsc] = useState("");
    const handleClose = () => setShow(false);
    const handlePostCommentModalClose = () => setShowPostCommentModal(false);
    const handleShow = () => setShow(true);
    const handleShowPostComment = (billDesc) => {
    setShowPostCommentModal(true);
    setBillDsc(billDesc);
    }
    const[expenseDesc,setExpenseDesc] = useState("");
    const[expenseAmount,setExpenseAmount] = useState("");
    const[noOfPplInGrp, setnoOfPplInGrp] = useState("");
    const[PplInGrp, setPplInGrp] = useState("");
    const[fields, setFields] = useState([]);

    const [addBillParedObj, setAddBillGrpParedObj] = useState([]);
    const [getBillParedObj, setGetBillParedObj] = useState([]);
    const [open, setOpen] = React.useState(true);
    const[postComment, setPostComment] = useState("");
    const [openAccepted, setOpenAccepted] = React.useState(false);
    const [openRejected, setOpenRejected] = React.useState(false);

    const[billAddedMsg,setBillAddedMsg] = useState("");

    const handleExpandClick = (id) => {
      setOpen(!open);
    };

    const handleLeaveGroup = () =>{
      const headers = {
        headers: {
          'Content-Type': 'application/json' ,
          'Authorization': token
        }
    }
      const body = {
          'groupName':groupName
      }
      axios.post("http://localhost:4000/api/billtransactions/leaveGroup",body,headers)
            .then((response) =>{
                console.log("Leave group: "+JSON.stringify(response.data));
                if(response.status===200){
                 var billList = JSON.stringify(response.data);
                 setAddBillGrpParedObj(JSON.parse(billList));
                // }else if(response.status===400){
                //     setShowNoMyGrpMsg("You are not a part of any group!");
                }
            }).catch(err=>{
                console.log(err);
                //setShowNoMyGrpMsg("You are not a part of any group!");
            });
    }
    const handlePostCommentSubmit = (billDesc) =>{
    console.log("Bill desc: "+billDsc);
    console.log("post comment: "+postComment);
    const headers = {
      headers: {
        'Content-Type': 'application/json' ,
        'Authorization': token
      }
  }
    const body = {
        'expenseDesc': billDsc,
        'postComment':postComment,
        'groupName':groupName
    }
    axios.post("http://localhost:4000/api/billtransactions/addExpenseComment",body,headers)
            .then((response) =>{
                console.log("Added expense comment: "+JSON.stringify(response.data));
                if(response.status===200){
                 var billList = JSON.stringify(response.data);
                 setAddBillGrpParedObj(JSON.parse(billList));
                // }else if(response.status===400){
                //     setShowNoMyGrpMsg("You are not a part of any group!");
                }
            }).catch(err=>{
                console.log(err);
                //setShowNoMyGrpMsg("You are not a part of any group!");
            });
    
    }

    useEffect(() =>{
        const loadBills = () =>{
            const headers = {
              headers: {
                'Content-Type': 'application/json' ,
                'Authorization': token
              }
          }
            const body = {
                'groupName': groupName
            }
            console.log("will call /api/group/test with token: "+token);
            console.log("grp name: "+groupName);
            axios.post("http://localhost:4000/api/billtransactions/getGroupBills",body,headers)
            .then((response) =>{
                console.log("Groups Bills: "+JSON.stringify(response.data));
                if(response.status===200){
                 var billList = JSON.stringify(response.data);
                 setAddBillGrpParedObj(JSON.parse(billList));
                // }else if(response.status===400){
                //     setShowNoMyGrpMsg("You are not a part of any group!");
                }
            }).catch(err=>{
                console.log(err);
                //setShowNoMyGrpMsg("You are not a part of any group!");
            });
    
            
        }
        loadBills();
    },[]);

    function Alert(props) {
        return <MuiAlert elevation={10} variant="filled" {...props} />;
    }

    const handleAcceptedClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpenAccepted(false);
      };

    const handleModalValues = (e) =>{
        e.preventDefault();
        setBillAddedMsg("");
        console.log("calling addBillDetails API");
        const headers = {
            'Content-Type': 'application/json' ,
            'Authorization': token
        }
        const body = {
            'groupName': groupName,'expenseAmount': expenseAmount,'expenseDesc':expenseDesc
           }
        axios.post('http://localhost:4000/api/billtransactions/addbilldetails',body,{
            headers: headers
        }).then((response)=>{
           if(response.status===200){
            setOpenAccepted(true);
            var bill = JSON.stringify(response.data);
            console.log("Bill: "+bill);
            console.log("Parsed bill: "+JSON.parse(bill));
            billArray.push(JSON.parse(bill));
            console.log("Bill array:"+JSON.stringify(billArray));
            setAddBillGrpParedObj(billArray);
            console.log("Bill added successfully");
                // var lent = (billAmount/noOfPplInGrp)*(noOfPplInGrp-1);
                // setBillAddedMsg("You paid: "+billAmount+" You lent: "+lent);
           } 
        }).catch(err=>{
            console.log(err);
        });
    }

         return(
             <>

            <NavbarAfterLogin /> 
            <Container>

            <Snackbar open={openAccepted} autoHideDuration={6000} onClose={handleAcceptedClose}>
                    <Alert style={{fontSize:"20px"}} onClose={handleAcceptedClose} severity="success">
                        You have added an expense
                    </Alert>
            </Snackbar>
        <Row>
       
            <Col>
                    <br/>
                    <Card className={classes.root}>
                    <CardContent >
                    <Typography className={classes.gName}>
                    {groupName}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button style={{borderColor:"#ccc",padding:"6px 10px",fontSize:"15px",float:"right",background:"#ff652f",color:"#fff",fontWeight:"bold",borderRadius:"7px"}} variant="primary" onClick={handleShow}>
                        Add an expense
                    </Button>
                    <Button style={{borderColor:"#ccc",padding:"6px 10px",fontSize:"15px",float:"right",background:"#ff652f",color:"#fff",fontWeight:"bold",borderRadius:"7px"}} variant="primary" onClick={handleLeaveGroup}>
                        Leave group
                    </Button>
                    </CardActions>
                    </Card>
                    <Grid container spacing="2">
                    {addBillParedObj.map(bill => (
                    <Grid item>
                    <Paper style={{ height:60 , width:800, background:"#eee",fontSize:20}}>
                      <p>{bill.expenseDesc}</p>
                      <Button onClick={()=>handleShowPostComment(bill.expenseDesc)}>Add Comment</Button>

                      <Modal style={{opacity:5}} show={showPostCommentModal} onHide={handlePostCommentModalClose} centered>
                <Modal.Header style={{background:"#5bc5a7"}} closeButton>
                <Modal.Title style={{fontWeight:"bold"}}>Add an expense</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Container>
                <Row>
                <Image style={{height:"30px",width:"30px"}}classname="logo" src={addExpenseDesc} />
                <Col style={{fontWeight:"bold",fontSize:"13px",borderRadius:"10px"}} xs={12} md={8}>
                <Form.Group>
                <Form.Control
                style={{borderRadius:"5px",fontSize:"20px"}} 
                type="text" 
                onChange={e=> setPostComment(e.target.value)} 
                value={postComment} 
                placeholder="Post a comment"
                /> <br/>                
                </Form.Group>
                </Col>
                </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button style={{color: "black",background: "#ffffff",borderRadius: "5px",fontSize:"13px",fontWeight:"bold"}} onClick={handlePostCommentModalClose}>
                    Close
                </Button>
                <Button style={{color: "#ffffff",background: "#5bc5a7",borderRadius: "5px",fontSize:"13px",fontWeight:"bold"}} onClick={handlePostCommentSubmit}>
                    Post
                </Button>
                </Modal.Footer>
            </Modal>


                    </Paper>
                    </Grid>
                    ))}

                    </Grid>
            </Col>

                
            <Col>
                    <br/>
                    <Card>
                        <CardContent>
                        <Typography style={{fontSize:"15px"}} color="textSecondary" gutterBottom>
                        GROUP BALANCES
                        </Typography>  
                        </CardContent>
                    </Card>
            </Col>
            </Row>
        </Container>
                <Modal style={{opacity:5}} show={show} onHide={handleClose} centered>
                <Modal.Header style={{background:"#5bc5a7"}} closeButton>
                <Modal.Title style={{fontWeight:"bold"}}>Add an expense</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Container>
                {/* <Row>
                <Col style={{fontWeight:"bold",fontSize:"13px"}} xs={12} md={8}>
                With You and:
                </Col>
                </Row>
                <hr/> */}
                <Row>
                <Image style={{height:"30px",width:"30px"}}classname="logo" src={addExpenseDesc} />
                <Col style={{fontWeight:"bold",fontSize:"13px",borderRadius:"10px"}} xs={12} md={8}>
                <Form.Group>
                <Form.Control
                style={{borderRadius:"5px",fontSize:"20px"}} 
                type="text" 
                onChange={e=> setExpenseDesc(e.target.value)} 
                value={expenseDesc} 
                placeholder="Enter a description"
                /> <br/>          
                <Form.Control
                style={{borderRadius:"5px",fontSize:"20px"}} 
                type="text" 
                onChange={e=> setExpenseAmount(e.target.value)} 
                value={expenseAmount} 
                placeholder="Enter an amount"
                />           
                </Form.Group>
                </Col>
                </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button style={{color: "black",background: "#ffffff",borderRadius: "5px",fontSize:"13px",fontWeight:"bold"}} onClick={handleClose}>
                    Close
                </Button>
                <Button style={{color: "#ffffff",background: "#5bc5a7",borderRadius: "5px",fontSize:"13px",fontWeight:"bold"}} onClick={handleModalValues}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>



            
            </>
            )

         }
 

 export default GroupPage;