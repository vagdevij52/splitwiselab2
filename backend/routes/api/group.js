const express = require('express');
const ObjectId = require('mongodb').ObjectId; 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys= require('../../config/keys');
//Load user model
const User = require('../../models/User');
//Load Profile model
const Profile = require('../../models/Profile');
//Load Group model
const Group = require('../../models/Group');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', ()=>{

});

// @route   POST api/createnewgroup
// @desc    Create a New Group
// @access  Private
router.post('/createNewGroup', passport.authenticate('jwt', { session: false }), (req,res)=>{
console.log("Req.gname: "+req.body.groupName);
console.log("group emails: "+JSON.stringify(req.body.emails));
console.log("Admin Id - Req.userid: "+req.user.id);// logged in user who is creating the group- Admin of Group
const errors = {};
Group.findOne({groupName: req.body.groupName})
.then(group => {
    console.log("Group: "+group);
    //Do not allow if same group name already exists.
    if(group){
        //errors.duplicategrouperrmsg = 'A group with same name already exists.Please provide a unique name';
        console.log("Group already exists!!");
        return res.status(400).json("A group with same name already exists.Please provide a unique name");
    }
    //Create New Group if Group Name is unique
        console.log("Creating a new group");
        const groupFields = {};
        groupFields.groupName = req.body.groupName;
        groupFields.adminId = req.user.id;
        groupFields.members = [];
        var users = [];
        groupFields.groupAvatar = req.body.groupAvatar;
        req.body.emails.forEach(email => {
            console.log("email: "+JSON.stringify(email));
            users.push(User.findOne({email:email}))
        });
        Promise.all(users).then((values)=>{
            console.log("Values: "+values);
            values.forEach(value=>{
                if(value!==null){
                    var user = {};
                    if(value.id === req.user.id){
                        user.isProcessed = 'Y';
                        user.isAccepted = 'Y';
                    }else{
                        user.isProcessed = 'N';
                        user.isAccepted = 'N';
                    }
                    user.member = value.id;
                    console.log(user);
                    groupFields.members.push(user);
                    console.log(groupFields);
                }
            });
            console.log('groupfields: '+JSON.stringify(groupFields));
            new Group(groupFields).save().then((group)=> res.json(group));
        }).catch(err=>{
            //res.status(400).json(err);
            res.json(duplicategrouperrmsg);
        });
});
});



// @route   POST api/profile
// @desc    Create users's profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In updateProfile- POST- API");
    console.log("Req.id: "+req.user.id);
    console.log("Req.email: "+req.user.email);
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.username) profileFields.username = req.body.username;
    if(req.body.email) profileFields.email = req.body.email;
    if(req.body.avatar) profileFields.avatar = req.body.avatar;
    if(req.body.phone) profileFields.phone = req.body.phone;
    if(req.body.defaultCurrency) profileFields.defaultCurrency = req.body.defaultCurrency;
    if(req.body.timezone) profileFields.timezone = req.body.timezone;
    if(req.body.language) profileFields.language = req.body.language;

    Profile.findOne({user: req.user.id })
    .then(profile =>{
        if(profile){
            //Update if profile already exists
            console.log("Profile alreday exists..So updating!");
            Profile.findOneAndUpdate(
                { user:req.user.id }, 
                { $set: profileFields },
                { new: true }
            )
            .then(profile => res.json(profile) );
        }
        //Create if profile doesnt exists
        else{
            //check if handle exists
            Profile.findOne({handle: profileFields.handle})
            .then(profile => {
                if(profile){
                    errors.handle = 'That handle alreday exists';
                    res.status(400).json(errors);
                }
                //Save Profile
                console.log("Creating a new profile!");
                new Profile(profileFields).save().then(profile => res.json(profile) );
            })
        }
    })
    });
module.exports = router;