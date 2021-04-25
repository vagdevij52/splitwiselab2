//Load Group model
const Group = require('../../models/Group');
const ObjectId = require('mongodb').ObjectId; 

module.exports = {
    // This function needs to return a promise
    acceptInviteKafka: async (groupval, id) => {
        console.log("Backend -- acceptInviteKafka - MODULES - -- In Accept Invite- POST- API "+groupval + " "+ id);
        //Group.findOneAndUpdate({groupName: groupval, 'members.member': id}, {$set: {"members.$.isProcessed" : "Y", "members.$.isAccepted" : "Y"}}).then(group =>{
        Group.findOneAndUpdate({groupName: groupval, 'members.member': id}).then(group =>{
            console.log("Group "+group)
        if(group){
            console.log("Invitation accepted");
            res.json(group);
        }
    }).catch(err => {
        console.log("Error "+ err);
        res.json(err);
    })
    },
    getDummyData: async (name) => {
        Dummy.find({name: name}).then(data=>{
         console.log(data);   
        })
        return data;
    },
}