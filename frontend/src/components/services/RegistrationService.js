import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {API_URL} from '../../constants/Constants';


const RegistrationService = (username,email,password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
            console.log("User registered sucessfully");
            return response.status;
        }    
    }).catch(err=>{
      console.log(err);
    });
}

export default RegistrationService;