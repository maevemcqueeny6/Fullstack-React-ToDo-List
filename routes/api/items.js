const express = require('express');
const router = express.Router();

// Item Model - need it to make queries and search through the items 
const Item = require('../../models/Item');

// Now its time to create our routes 

// @route GET api/items 
// @desc Get All Items 
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
        .then(items => res.json(items))
})

// @route POST api/items 
// @desc Create an Item 
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    // Saves the item then spits it back to us in json form to view
    newItem.save().then(item => res.json(item))
})

// @route DEL api/items 
// @desc delete an Item 
router.delete('/:id', (req, res) => {
    // req.params.id takes the id value from the URL 
    Item.findById(req.params.id)
        .then(item => item.remove().then(()=> res.json({success: true})))
        .catch(err => res.status(404).json({sucess: false}))
})




// exporting the router allows other files to recognize this route 
module.exports = router;
