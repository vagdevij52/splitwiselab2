import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import CreateANewGroup from './CreateANewGroup/CreateANewGroup';
import Dashboard from './Dashboard/Dashboard';
import Group from './Group/Group';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import MyGroups from './MyGroups/MyGroups';
import Profile from './Profile/Profile';
import RecentActivity from './RecentActivity/RecentActivity';
import AuthService from './Services/AuthService';


//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/createnewgroup" component={CreateANewGroup}/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/group" component={Group}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/mygroups" component={MyGroups}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/recentactivity" component={RecentActivity}/>               
            </div>
        )
    }
}
//Export The Main Component
export default Main;