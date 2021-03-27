const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    defaultCurrency:{
        type: double,
        required: true
    },
    userTimeZone:{
        type: Date,
        required: true
    },
    userlanguage:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
  },{timestamps: true});

module.exports = User = mongoose.model('users', UserSchema);