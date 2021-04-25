const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const {kafka} = require('../kafka-backend/kafka');
//const modules = require('./modules');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const group = require('./routes/api/group');
const billtransactions = require('./routes/api/billtransactions');

const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

//kafka call
// let callAndWait = () => {
//   console.log('Kafka client has not connected yet, message will be lost');
// };

// (async () => {
//   if (process.env.MOCK_KAFKA === 'false') {
//       const k = await kafka();
//       callAndWait = k.callAndWait;
//   } else {
//       callAndWait = async (fn, ...params) => modules[fn](...params);
//       console.log('Connected to dev kafka');
//   }
// })();

// connect to mongoDb using mongoose -- Connection pooling

mongoose
    .connect(db)
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));


//passport middleware
app.use(passport.initialize());

//passport config.
require('./config/passport')(passport);

//Use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/group', group);
app.use('/api/billtransactions', billtransactions);

//app.use('/api/posts', posts);

// app.post('/getDummyData', async (req, res) => {
//   const data = await callAndWait('getDummyData', req.body.name);
//   res.json({data});
// })

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`))