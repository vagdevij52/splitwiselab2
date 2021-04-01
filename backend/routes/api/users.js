const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys= require('../../config/keys');
//Load user model
const User = require('../../models/User');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



router.get('/test', (req, res) => res.json({msg: 'Post Works'}));

// @route   POST api/users/signup
// @desc    Tests signup route
// @access  Public
router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        // validation
            if(user){
                //errors.email = 'Email already exists';
                return res.status(400).json('Email already exists');
            }else{
                console.log("Creating a new user");
                const newUser =  new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        console.log("New user: "+newUser);
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        }).catch(function(err) {
            res.status(400).json(err);
          })
})


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email : email }). then(user => {
        if(!user){
            errors.email = 'user email/password are not correct';
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    id: user.id
                }
                //res.json({ msg: 'Success'})
                jwt.sign(
                    payload, 
                    keys.secretOrKey, 
                    { expiresIn: 3600}, 
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer '+ token
                        })
                    });
            }else{
                errors.email = 'user email/password are not correct';
                return res.status(400).json(errors);
            }
        })
    })
});



router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json(req.user);
});
module.exports = router;