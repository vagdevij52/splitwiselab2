const express = require('express');
const ObjectId = require('mongodb').ObjectId; 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
var mongoose = require('mongoose');

require('dotenv').config();

const keys= require('../../config/keys');
//Load user model
const User = require('../../models/User');
//Load Profile model
const Profile = require('../../models/Profile');
//Load Group model
const Group = require('../../models/Group');
//Load BillTransaction model
const BillTransactions = require('../../models/BillTransactions');

const {kafka} = require('../../../kafka-backend/kafka');
const modules = require('./modules');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   POST api/addbilldetails
// @desc    Add Bill Details
// @access  Private
router.post('/addbilldetails', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In Add Bill Details - POST- API");
    Group.findOne({groupName: req.body.groupName}).then(group=>{
        if(!group){
            res.status(400).json({group: 'Group does not exist'});
        }else{
            const billtransactionsfields = {};
            const errors={};
            console.log("Request body: "+JSON.stringify(req.body));
            billtransactionsfields.authorId = req.user.id;
            billtransactionsfields.groupName = req.body.groupName;
            billtransactionsfields.expenseDesc = req.body.expenseDesc;
            billtransactionsfields.expenseAmount = req.body.expenseAmount;
            //billtransactionsfields.expenseComment = req.body.expenseComment;
            billtransactionsfields.members = [];
        
            var credit = billtransactionsfields.expenseAmount/group.members.length;
            console.log("Credit value for each member: "+credit);
            group.members.forEach(memberVal=>{
                var user={};
                if(String(req.user.id)===String(memberVal.member)){
                    // do nothing for author
                }else{
                    user.credit = credit;
                    user.member = memberVal.member;
                    billtransactionsfields.members.push(user);
                }
            });
            console.log('billTransactionFields: '+JSON.stringify(billtransactionsfields));
            new BillTransactions(billtransactionsfields).save().then(billtransactions=>
                res.status(200).json(billtransactions));
            }
    }).catch(err=>{
        res.status(400).json(err);
    });
});

// @route   POST api/getGroupBills
// @desc    Get A Group's Bills
// @access  Private
router.post('/getGroupBills', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In getGroupBills- GET- API");
    BillTransactions.find({groupName: req.body.groupName}).sort({
        created_at: -1
    })
    .then(bills=>{
        if(bills){
            res.json(bills)
        }
    });
});

// @route   POST api/getGroupBills
// @desc    Get A Group's Bills
// @access  Private
router.get('/getGroupBillsFromAllGroupsForAUser', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In getGroupBills- GET- API");
    BillTransactions.find({'members.member': req.user.id}).sort({
        created_at: -1
    })
    .then(bills=>{
        if(bills){
            res.json(bills)
        }
    });
});

// @route   POST api/addExpenseComment
// @desc    Add Expense Comment
// @access  Private
router.post('/addExpenseComment', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In Add Expense Comment - POST- API");
    console.log("Grp name: "+req.body.groupName);
    console.log("expesne desc: "+req.body.expenseDesc);
    console.log("expense comment: "+req.body.text);          
    console.log("req.user.id: "+req.user.id);
    console.log("req.user.username: "+req.user.username);                                                                                                                                                                                                                                                                              
   
    var newComment = {};
    newComment.author = req.user.id;
    newComment.text = req.body.text;
    newComment.name = req.user.username;
    console.log("new comment: "+JSON.stringify(newComment));

    BillTransactions.findOneAndUpdate(
        {expenseDesc: req.body.expenseDesc}, 
        {$push: {expenseComment: newComment}},
        {new: true})
        .then(ec =>{
        console.log(ec)
        if(ec){
            console.log("Added Expense Comment");
            res.json(ec);
        }
    }).catch(err=>{
        res.status(400).json(err);
    });
});

// @route   POST api/getExpenseComment
// @desc    Get Expense Comment
// @access  Private
router.post('/getExpenseComment', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In Get Expense Comment - POST- API");
    console.log("expesne desc: "+req.body.expenseDesc);
    //console.log("expense comment: "+req.body.postComment);  //'members.member': req.user.id
    console.log("req.user.id: "+req.user.id);                                            
    BillTransactions.find(
        {expenseDesc: req.body.expenseDesc})
        .then(expensecomment =>{
        console.log(expensecomment)
        if(expensecomment){
            console.log("Get Expense Comment");
            res.status(200).json(expensecomment);
        }
    })
});


// @route   POST api/leaveGroup
// @desc    Leave a Group
// @access  Private
router.post('/leaveGroup', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In Leave a Group - POST- API");
    console.log("Grp name: "+req.body.groupName);
    console.log("req.user.id: "+req.user.id);                                            
    BillTransactions.find({groupName:req.body.groupName}).then(billsCredit =>{
        console.log(billsCredit)
        if(billsCredit){
            console.log("Bills Credit");
            //if(billsCredit.)
            res.json(billsCredit);
            //res.json(expensecomment);
        }
    })
});

router.get('/youowe', passport.authenticate('jwt', { session: false }), (req,res) => {
    console.log("req.user.id: "+req.user.id)
    let id = mongoose.Types.ObjectId(req.user.id);
    BillTransactions.aggregate([
        {
            $match : {
                members: {
                    $elemMatch: {
                        member: id
                    }
                }
            }
        },
        {
            $unwind: '$members'
        },
        {
            $match:{
                "members.member": id
            }
        },
        {
            $group: {
                _id: '$members.member',
                sum: {
                    $sum: '$members.credit'
                }
            }
        }
    ]).then(billtransactions => {
        if(billtransactions){
            console.log("billtransactions "+billtransactions);
            if(billtransactions.length === 0){
               var billtransaction = {}
                billtransaction._id = id;
                billtransaction.sum = 0;
                billtransactions.push(billtransaction);
            }
            res.status(200).json(billtransactions);
        }else {
            billtransaction = {}
            billtransaction._id = id;
            billtransaction.sum = 0;
            billtransactions.push(billtransaction);
            res.status(200).json(billtransactions);
        }   
        
    })
    //select sum(credit) as credit from userTransaction  where authorEmail =? AND userEmail!=? group By authorEmail IS NOT NULL
});

router.get('/youAreOwed', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In YOU ARE OWED - POST- API");
    //console.log("Grp name: "+req.body.groupName);
    console.log("req.user.id: "+req.user.id);                                            
    let id = mongoose.Types.ObjectId(req.user.id);
    BillTransactions.aggregate([
    {$match: {authorId:  id}},
    {$unwind: '$members'},
    {$group:{
        _id: '$authorId',
        sum: {$sum: '$members.credit'}
    }}
]).then(billtransactions=>{
    console.log(billtransactions);
    res.status(200).json(billtransactions);
})
});



// @route   POST api/youOweSummary
// @desc    Get Expense Comment
// @access  Private
router.get('/youOweSummary', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In youOweSummary - GET- API");
    let id = mongoose.Types.ObjectId(req.user.id);                                          
    BillTransactions.aggregate([
        {$match: {authorId:  id}},
        {$unwind: '$members'},
        {$group:{
            _id: '$members.member',
            sume: {
                $sum: '$members.credit'
            }
        }}
    ]).then(billtransactions=>{
        console.log(billtransactions);
        let id = mongoose.Types.ObjectId(billtransactions._id);
        // console.log(billtransactions[0]._id);
        // var userIds = [];
        // billtransactions.forEach(users=>{
            
        //     userIds.push(users.id);
        // });
        // console.log("userIds: "+userIds);
        // for(var i=0;i<billtransactions.length;i++){
        //     console.log(billtransactions[i]._id);
            // User.find({_id: {$in: billtransactions[i]._id}})
            // .then((users)=>{
            //     console.log("Users: "+users);
            // })
        // }
        // User.aggregate([
        //     {$match: {_id:  id}}, 
        // ]).then((user)=>{
        //     console.log("User: "+user);
        // })
        
        //User.findById({_id: {$in: obj_ids}})
        //console.log(billtransactions);
        //res.status(200).json(billtransactions);
    })
});

router.get('/youAreOwedSummary', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In youAreOwedSummary - GET- API");
    let id = mongoose.Types.ObjectId(req.user.id);                                          
    BillTransactions.aggregate([
        {$match: {authorId:  id}},
        {$unwind: '$members'},
        {$group:{
            _id: '$members.member',
            sume: {
                $sum: '$members.credit'
            }
        }}
    ]).then(billtransactions=>{
        console.log(billtransactions);
        let id = mongoose.Types.ObjectId(billtransactions._id);
        // console.log(billtransactions[0]._id);
        // var userIds = [];
        // billtransactions.forEach(users=>{
            
        //     userIds.push(users.id);
        // });
        // console.log("userIds: "+userIds);
        // for(var i=0;i<billtransactions.length;i++){
        //     console.log(billtransactions[i]._id);
            User.find({_id: {$in: billtransactions[i]._id}})
            .then((users)=>{
                console.log("Users: "+users);
            })
        // }
        // User.aggregate([
        //     {$match: {_id:  id}}, 
        // ]).then((user)=>{
        //     console.log("User: "+user);
        // })
        
        //User.findById({_id: {$in: obj_ids}})
        //console.log(billtransactions);
        //res.status(200).json(billtransactions);
    })
});

module.exports = router;