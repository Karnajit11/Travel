let Email = require('../models/emails').Email;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();


router.get('/', async (req, res) =>{
   res.send(await Email.find());
});
router.post('/', async (req, res) =>{
    let reqBody = req.body;
    let newEmail = new Email({
        id : uniqid(),
        name : reqBody.name,
        email : reqBody.email,
        text : reqBody.text,
        date : new Date()
    })
    await newEmail.save();
    res.send('Accepted');
});
router.delete('/:id', async(req, res) =>{
    await Email.deleteOne({ id : req.params.id });
    res.send('Deleted');
});

module.exports = router;