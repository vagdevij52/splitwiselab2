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
    console.log("expense comment: "+req.body.postComment);          
    console.log("req.user.id: "+req.user.id);                                                                                                                                       
    // BillTransactions.updateOne({expenseDesc: req.body.expenseDesc, groupName:req.body.groupName ,'members.member': req.user.id}, {$set: {"expenseComment.$.comment" : req.body.postComment, "expenseComment.member": req.user.id}},{useFindAndModify: false}).then(expensecomment =>{
    //     console.log(expensecomment)
    //     if(expensecomment){
    //         console.log("Expense Comment Added");
    //         res.json(expensecomment);
    //     }
    // })

    BillTransactions.findOneAndUpdate({expenseDesc: req.body.expenseDesc, groupName:req.body.groupName ,'members.member': req.user.id}, { $push: {"expenseComment.$.comment" : req.body.postComment} }, {$push: {"expenseComment.member" : req.user.id}}).then(expensecomment =>{
        console.log(expensecomment)
        if(expensecomment){
            console.log("Expense Comment Added");
            res.json(expensecomment);
        }
    })

    // var expenseCommentFields = [];
    // expenseCommentFields.
    // new BillTransactions(expenseCommentFields).save().then((comments)=>res.json(comments));

//     BillTransactions.findOne({'members.member': req.user.id})
// .then(bill => {
//     console.log("Group: "+bill);
//     //Do not allow if same group name already exists.
//     if(bill){
//         //errors.duplicategrouperrmsg = 'A group with same name already exists.Please provide a unique name';
//         console.log("bill exists!!");
//     }
//     //Create New Group if Group Name is unique
//         console.log("Creating comment");
//         const groupFields = {};
//         groupFields.groupName = req.body.groupName;
//         groupFields.adminId = req.user.id;
//         groupFields.members = [];
//         var users = [];
//         groupFields.groupAvatar = req.body.groupAvatar;
//         req.body.emails.forEach(email => {
//             console.log("email: "+JSON.stringify(email));
//             users.push(User.findOne({email:email}))
//         });
//         Promise.all(users).then((values)=>{
//             console.log("Values: "+values);
//             values.forEach(value=>{
//                 if(value!==null){
//                     var user = {};
//                     if(value.id === req.user.id){
//                         user.isProcessed = 'Y';
//                         user.isAccepted = 'Y';
//                     }else{
//                         user.isProcessed = 'N';
//                         user.isAccepted = 'N';
//                     }
//                     user.member = value.id;
//                     console.log(user);
//                     groupFields.members.push(user);
//                     console.log(groupFields);
//                 }
//             });
//             console.log('groupfields: '+JSON.stringify(groupFields));
//             new Group(groupFields).save().then((group)=> res.json(group));
//         }).catch(err=>{
//             //res.status(400).json(err);
//             res.json(duplicategrouperrmsg);
//         });
// });

});

// @route   POST api/getExpenseComment
// @desc    Get Expense Comment
// @access  Private
router.post('/getExpenseComment', passport.authenticate('jwt', { session: false }), (req,res)=>{
    console.log("Backend -- In Get Expense Comment - POST- API");
    console.log("Grp name: "+req.body.groupName);
    console.log("expesne desc: "+req.body.expenseDesc);
    //console.log("expense comment: "+req.body.postComment);  //'members.member': req.user.id
    console.log("req.user.id: "+req.user.id);                                            
    BillTransactions.find({expenseDesc: req.body.expenseDesc, groupName:req.body.groupName , $or: [ {'members.member': req.user.id}, { authorId: req.user.id } ]}).then(expensecomment =>{
        console.log(expensecomment)
        if(expensecomment){
            console.log("Get Expense Comment");
            res.json(expensecomment);
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

// @route   GET api/youOwe
// @desc    Show How much you Owe to others
// @access  Private
// router.get('/youOwe', passport.authenticate('jwt', { session: false }), (req,res)=>{
//     console.log("Backend -- In YOU OWE - POST- API");
//     //console.log("Grp name: "+req.body.groupName);
//     console.log("req.user.id: "+req.user.id);                                            
//     BillTransactions.find({'members.member': req.user.id}).then(billsCredit =>{
//         if(billsCredit){
//             var youowe = 0;
//             var pplYouOwe = new Map([]);
//             var amountYouOweToPpl = 0;
//             for(var i=0;i<billsCredit.length;i++){
//                 for(var j=0;j<billsCredit[i].members.length;j++){
//                     //console.log("Id: "+billsCredit[i].members[j].member+"Credit: "+billsCredit[i].members[j].credit);
//                     //console.log(billsCredit[i].members[j].member +" - "+req.user.id);
//                      if(billsCredit[i].members[j].member==req.user.id){
//                          youowe+=billsCredit[i].members[j].credit;
//                          //pplYouOwe.set(billsCredit[i].authorId,)
//                          console.log(billsCredit[i].authorId + " - "+billsCredit[i].members[j].credit);
//                          User.find({_id:billsCredit[i].authorId}).then((usernames)=>{
//                             console.log("Usernames: "+usernames);
//                          })
//                          //pplYouOwe.push(billsCredit[i].authorId)
//                     //console.log("User is there");
//                      }
                     
//                 }
//                 // console.log("Author id: "+billsCredit[i].authorId);
//                 //      User.find({_id:billsCredit[i].authorId}).then((usernames)=>{
//                 //          for(var i=0;i<usernames;i++){

//                 //          }
//                 //          console.log("Usernames: "+usernames);
//                 //          if(usernames){
//                 //             pplYouOwe.push(usernames.username);
//                 //          }
//                 //      })
//             }
//             console.log("YOU OWE: "+youowe);
//             console.log("To Ppl you owe: "+pplYouOwe);
//             console.log("Bills Credit");
//             res.status(200).json(youowe);
//         }
//     })
// });

// router.post('/youowe', passport.authenticate('jwt', { session: false }), (req,res)=>{
// console.log("In YOU OWE API");
// let id = mongoose.Types.ObjectId(req.user.id);
// BillTransactions.aggregate([
//     {$unwind: '$members'},
//     {$match: {members: {credit: 30}}},
//     {$group:{
//         _id: '$members.member',
//         sum: {$sum: '$members.credit'}
//     }}
// ]).then((billtransactions)=>{
//     console.log("billtransactions: "+billtransactions);
//     if(billtransactions){
//         if(billtransactions.length === 0){
//             var billtransaction = {};
//             billtransaction._id = id;
//             billtransaction.sum = 0;
//             billtransactions.push(billtransaction);
//         }
//         res.json(billtransactions);
//     }else{
//         billtransaction = {};
//         billtransaction._id = id;
//         billtransaction.sum = 0;
//         billtransactions.push(billtransaction);
//         res.json(billtransactions);
//     }
// })
// });


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





// @route   POST api/youAreOwed
// @desc    Show How much others owe you
// @access  Private
// router.post('/youAreOwed', passport.authenticate('jwt', { session: false }), (req,res)=>{
//     console.log("Backend -- In YOU ARE OWED - POST- API");
//     //console.log("Grp name: "+req.body.groupName);
//     console.log("req.user.id: "+req.user.id);                                            
//     BillTransactions.find({'members.member': req.user.id}).then(billsCredit =>{
//         if(billsCredit){
//             var youowe = 0;
//             for(var i=0;i<billsCredit.length;i++){
//                 for(var j=0;j<billsCredit[i].members.length;j++){
//                     console.log("Credit: "+billsCredit[i].members[j].credit);
//                     youowe+=billsCredit[i].members[j].credit;
//                 }
//             }
//             console.log("YOU OWE: "+youowe);
//             console.log("Bills Credit");
//             res.json(youowe);
//         }
//     })
// });


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
        let id = mongoose.Types.ObjectId(billtransactions._id);
        console.log(billtransactions[0]._id);
        for(var i=0;i<billtransactions.length;i++){
            User.find({_id: {$in: billtransactions._id}})
            .then((users)=>{
                console.log("Users: "+users);
            })
        }
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