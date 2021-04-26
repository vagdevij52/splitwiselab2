import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import CreateANewGroupPage from '../pages/CreateANewGroupPage/CreateANewGroupPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import GroupPage from '../pages/GroupPage/GroupPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import MyGroupsPage from '../pages/MyGroupsPage/MyGroupsPage';
import SearchResults from '../pages/MyGroupsPage/SearchResults';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RecentActivityPage from '../pages/RecentActivityPage/RecentActivityPage';
import NavbarBeforeLogin from '../pages/Navbar/NavbarBeforeLogin';
//import AuthService from './Services/AuthService';


//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/landing" component={LandingPage}/>
                <Route path="/createnewgroup" component={CreateANewGroupPage}/>
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/group" component={GroupPage}/>
                <Route path="/signup" component={SignupPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/mygroups" component={MyGroupsPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route exact path="/search/:query"><SearchResults /></Route>
                <Route path="/recentactivity" component={RecentActivityPage}/>
                <Route path="/navbarbeforelogin" component={NavbarBeforeLogin}/>               
            </div>
        )
    }
}
//Export The Main Component
export default Main;