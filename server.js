const express = require('express');
const mongoose = require('mongoose');
// allows you to take requests and take info from the body, allows you to parse the requests
const path = require('path');
// allows you to deal with file paths

const config = require('config');
// config allows you to have secret keys


const items = require('./routes/api/items');

const users = require('./routes/api/users');

const auth = require('./routes/api/auth');


const app = express();

// Bodyparser Middleware 
app.use(express.json());

// DB Config
const db = config.get('mongoURI'); 

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then( () => console.log('MongoDB Connected... '))
    .catch(err => console.log(err));

// User Routes 
// anything that refers to this location (/api/items), should refer to this file items, which is defined above 
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);


// Serve static assets if in production 
if(process.env.NODE_ENV === 'production'){
    // set a statis folder 
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        // directs you to the index.html file 
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));