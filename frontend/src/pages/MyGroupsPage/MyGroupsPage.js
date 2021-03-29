import axios from 'axios';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import mainlogo from '../../assets/logo.png';
import '../../styles/mygroups.css';
//import '../../styles/groups.css';
import {Redirect} from 'react-router';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { useState, useEffect ,setState} from 'react'
import { FormControl,Modal,Container,Row, Col,Image,Button} from 'react-bootstrap';
import LoadMyGroups from '../MyGroupsPage/LoadMyGroups';
import LoadOtherGroups from '../MyGroupsPage/LoadOtherGroups';
//import SearchBar from '../SearchBar';
import NavbarAfterLogin from '../Navbar/NavbarAfterLogin';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';

export const MyGroupsPage = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    return(
        <body>
        <NavbarAfterLogin /> 
        <br/><br/>
        <Row>
            <Col></Col>
            <Col>
            <TextField style={{width:"300px",fontSize:"50px"}}
                            id="searchInput"
                            placeholder="Search for your groups"   
                            margin="dense"
                            endIcon={<SearchIcon />}
                            // onChange={this.onSearchInputChange}
                            />

            </Col>
            <Col>
                 <Row><LoadOtherGroups /></Row><br/>
                 <Row><LoadMyGroups /></Row>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
        </Row>
        </body>

        // <>
        // <NavbarAfterLogin/>
        // <Row>
        // <Col></Col>
        //     <Col>
        //         <LeftSideBar />
        //     </Col>
        //     <Col>
        //         <Row>
        //             <LoadOtherGroups />
        //         </Row>
        //         <Row>
        //             <LoadMyGroups />
        //         </Row>
        //     </Col>
        //     <Col></Col>
        // </Row>
        // </>
    );
}

export default MyGroupsPage;


// className="notification"