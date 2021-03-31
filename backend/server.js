const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');



const users = require('./routes/api/users');
//const profiles = require('./routes/profiles');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

// connect to mongoDb using mongoose

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
//app.use('/api/profile', profiles);
//app.use('/api/posts', posts);



const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`))