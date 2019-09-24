const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model - need it to make queries and search through the items 
const User = require('../../models/User');

// Now its time to create our routes 

// @route POST api/users 
// @desc Register new user 
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // simple validation 
    if(!name || !email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    // check for existing user
    // look fro the email thats email to the email variable 
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists' })

            const newUser = new User ({
                name, 
                email, 
                password
            });

            // generate SALT to create a plaintext Hash which will be stored in the database

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err; 
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                // sets up the token to expire in an hour 

                                (err, token) => {
                                if(err) throw err;
                                
                                res.json({ 
                                    // in addition to the use i want to add the token
                                    token,

                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                 });
                            
                                }
                            )

                            
                        });
                })
            })

        })
    
});

module.exports = router;
