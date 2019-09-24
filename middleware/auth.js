const config = require('config');
const jwt = require('jsonwebtoken');


// creates a middleware function. when youre done with whatever this middleware does you call 'next' to move onto the next function

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    // Check for token
    if (!token) 
        return res.status(401).json({ msg: 'no token, authorization denied' })
    // 401 status means UNAUTHORIZED you dont have the correct permission

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;

        next();
    } catch (e) {
        res.status(400).json({msg: 'token is not valid'})
        // 400 status means bad request
    }
}

module.exports = auth;