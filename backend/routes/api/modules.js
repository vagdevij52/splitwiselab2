
const BillTransactions = require('../../models/BillTransactions');

const Group = require('../../models/Group');

const User = require('../../models/User');

const mongoose = require('mongoose');

const db = require('../../config/keys').mongoURI;



// connect to mongoDb using mongoose



// mongoose

//     .connect(db)

//     .then(() => console.log("MongoDb connected"))

//     .catch(err => console.log(err));



module.exports = {

    // This function needs to return a promise

    sum: async (a, b) => {

        return a + b;

    },

    addComment: async(user, text, expenseName) => {

        await mongoose.connect(db)//.then(() => console.log("MongoDb connected")).catch(err => console.log(err));

        console.log("user "+ JSON.stringify(user), text, expenseName);

        var newComment = {};

        newComment.author = user._id;

        newComment.text = text;

        newComment.name = user.name;

        //newComment.date = Date.now;

        console.log("new comment2: "+JSON.stringify(newComment));

        // const billtransactions = await BillTransactions.find({expenseName: expenseName});

        // return billtransactions;

        //const BillTransactions = require('../../models/BillTransactions');

        

        const billTxns = await BillTransactions.findOneAndUpdate(

            {expenseDesc: expenseName},

            {$push: {expenseComment: newComment}},

            {new: true}

            );

        return billTxns;

    },

    addBill: async(user, groupName, expenseName, expense) => {

        mongoose

            .connect(db)

            .then(() => console.log("MongoDb connected"))

            .catch(err => console.log(err));

        console.log("user "+ JSON.stringify(user), groupName, expenseName, expense);

        var groups = await Group.findOne({groupName: groupName});

        var members  = groups.members;

        console.log("group "+group);  

        const billTransactionsFields = {};

        billTransactionsFields.authorId = user._id;

        billTransactionsFields.groupName = groupName;

        billTransactionsFields.expenseName = expenseName;

        billTransactionsFields.expense = expense;

        billTransactionsFields.members = [];

        var credit = expense/group.members.length;

        console.log("Credit value : "+credit);

        

        for(var i=0;i<members.length;i++){

            var user = {};

            if(String(user._id)=== String(members[i].member)){



            }else{

                console.log(members[i].member);

                user.credit = credit;

                user.member = members[i].member;

                billTransactionsFields.members.push(user);

            }

        }

        // await group.members.forEach(memberval => {

        //     var user = {};

        //     if(String(req.user.id)=== String(memberval.member)){



        //     }else{

        //         console.log(memberval.member)

        //         user.credit = credit;

        //         user.member = memberval.member;

        //         billTransactionsFields.members.push(user);

        //     }

        // }); 

        console.log('billTransactionsFields :'+JSON.stringify(billTransactionsFields));

        const billTxns =  await new BillTransactions(billTransactionsFields).save();

        return billTxns;   

    }

}