const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model - need it to make queries and search through the items 
const User = require('../../models/User');

// Now its time to create our routes 

// @route POST api/auth 
// @desc authenticate the user 
// its public so that we can get the token, and then send it along to private routes. REMINDEr the token is the ID of the user, not the password
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // simple validation 
    if( !email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    // check for existing user
    // look fro the email thats email to the email variable 
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' })

            // Validate password 
            // user.password is the hashed password 
            bcrypt.compare(password, user.password) 
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'invalid credentials'})
                    
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )  
                })

        })
    
})

// @route GET api/auth/user
// @desc get user data
// @access private  
router.get('/user', auth, (req, res) =>{
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})



module.exports = router;
