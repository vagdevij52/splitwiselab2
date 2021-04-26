import axios from 'axios';
//import {API_URL} from '../../constants/Constants';
import { storeRegUserData, userSelector } from '../../slices/registereduserSlice';
import { useDispatch, useSelector } from 'react-redux'
import API_URL from '../../config/backendurl';


const RegistrationService = (username,email,password) => {
    console.log("In Regsitration service");
    const dispatch = useDispatch();
    console.log("Using useselector");
    //const [ name, useremail ] = useSelector(userSelector);
    console.log(" going to make axios call");
    return axios.post("http://54.227.195.128:4000/api/users/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log("Response from axios: "+JSON.stringify(response));
        if (response.status === 200) {
          console.log("dispatching user data to user slice");
            dispatch(storeRegUserData(response));
            console.log("User registered sucessfully");
            return response;
        }    
    }).catch(err=>{
      console.log(err);
    });
}

export default RegistrationService;