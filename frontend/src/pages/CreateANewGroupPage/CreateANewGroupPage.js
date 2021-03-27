import React from 'react';
import { useState, useRef, useContext, useEffect} from "react";
import {Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import mainlogo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import { FormControl,Modal,Container,Row,Col,Image,Button, Form, FormLabel} from 'react-bootstrap';
import NavbarAfterLogin from '../Navbar/NavbarAfterLogin';
import '../../styles/createNewGroup.css';
import {Link} from 'react-router-dom';

const CreateANewGroupPage = () => {
    //const groupAdmin = user.email;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[createGroupName,setCreateGroupName] = useState("");
    const[groupMemName, setGroupMemName] = useState("");
    const[groupMemEmail, setGroupMemEmail] = useState("");
    const[groupNameValid,setGroupNameValid] = useState("");
    const[newGrpCreatedMsg,setNewGrpCreatedMsg] = useState("");

    const [fields, setFields] = useState([{ value: null }]);

    const handleCreateGroup = (e) =>{
    }
    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
      }
    
      function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
      }
    
      function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
      }
    return(
    <body>            
        <NavbarAfterLogin/>
            <div>               
               <div style={{width:"auto", maxWidth: "510px", marginLeft:"400px",paddingTop: "60px"}}>
                   <img width="200" height="200" style={{float:"left",marginRight:"25px"}} src={mainlogo} alt="logo"/>
                   <div style={{float:"left", maxWidth: "240px", marginLeft: "15px", paddingBottom: "60px"}}>
                       <div style={{textTransform: "uppercase", fontSize: "18px", color: "gray",fontWeight:"bold" ,lineHeight: "20px"}}>
                       START A NEW GROUP
                       </div>
                       <form onSubmit={handleCreateGroup} style={{margin: "15px 0 0", width: "260px"}}>
                           <div style={{fontSize: "22px", lineHeight: "140%", margin: "16px 0 5px"}}>
                           My group shall be called…
                           </div>
                           <div>
                               <div className="input">
                                   <input 
                                   autoComplete="off" 
                                   style={{borderRadius:"5px",borderColor:"#ccc",fontSize: "35px", height: "45px"}}
                                   type="text"
                                   onChange={e => setCreateGroupName(e.target.value)}
                                   />
                               </div>
                               <div style={{color:"red",fontWeight:"bold",fontSize:"15px"}}>{groupNameValid}</div>
                               <br/>
                           </div><br/>
                           <div style={{marginTop: "10px", position: "relative"}}>
                               <hr style={{marginTop: "-30px",width:"380px",borderWidth:"2px"}}></hr>
                                <div style={{minHeight: "230px",width:"500px"}}>
                                <h4 style={{marginBottom:"10px",color:"#999",fontWeight:"bold"}}>GROUP MEMBERS</h4>
                                <Image roundedCircle width="20" height="20" style={{float:"left",marginRight:"25px"}} src={avatar} alt="logo"/>
                                 {/* <span style={{marginLeft:"-15px",fontSize:"15px"}}>{user.username}("<em>{user.email}</em>")</span> */}
                                 {/* get logged in username and email id */}
                                 <br/><br/>
                              {fields.map((field, idx) => {
                                return(
                                 <div className="field" key={`${field}-${idx}`}>
                                     <input 
                                     type="text" 
                                     style={{borderRadius:"5px",borderColor:"#ccc",height:"35px",fontSize:"17px",width:"30%",marginRight:"2px"}} 
                                     placeholder="Name"
                                     onChange={e => handleChange(idx, e)} 
                                     />
                                     &nbsp;
                                     <input 
                                     type="text" 
                                     style={{borderRadius:"5px",borderColor:"#ccc",height:"35px",fontSize:"17px",width:"50%",marginRight:"7px",marginBottom:"2px"}} 
                                     placeholder="Email address"
                                     onChange={e => handleChange(idx, e)}
                                     />
                                     <Link style={{color: "#c00",fontWeight:"bold",fontSize:"20px",right:"5px"}} onClick={() => handleRemove(idx)}>x</Link>
                                 </div>
                                )
                               })}
                                <div className="addPerson">
                                <Link style={{fontSize:"15px"}} onClick={() => handleAdd()} >+Add a person</Link>                                    
                                </div>
                                </div>
                                
                           </div>
                           <input type="submit" value="Save" style={{borderColor:"#ccc",fontWeight:"bold",width:"90px",fontSize: "18px",marginLeft:"-1px",background:"#ff652f",color:"#fff",textShadow:"0 -1px 0 #c83400",borderRadius:"5px"}} />
                           <div style={{fontWeight:"bold",color:"#5bc5a7",fontSize:"15px"}}>{newGrpCreatedMsg}</div>
                       </form>
                   </div>
               </div>
               </div>            
            </body>
            );
}

export default CreateANewGroupPage;