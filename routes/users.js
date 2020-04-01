let User = require('../models/users').User;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let userAuth = require('../controllers/userAuth');


router.post('/login',async (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({ email: email });

    if(user.length > 0){
        let comparismResult = await bcrypt.compare(password, user[0].password);
        if(comparismResult){
            let userToken = userAuth.generateToken(user[0]);
            res.cookie('user_auth',userToken);
            res.send({ 
                redirectURL: '/hotel'
            });
        }else{
            res.status(400);
            res.send('Rejected');
        }   
    }else{
        res.status(400);
        res.send('Rejected');
    }
})

router.post('/register',async (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let user = await User.find().where({ email: email });

    if(user.length === 0){
        let encrytPass = await bcrypt.hash(password,12);
       let newUser = new User({
           name: name,
           email: email,
           password: encrytPass
       })
       await newUser.save();
       res.send('Done');
    }else{
        res.send('Rejected');
    }
})

module.exports = router;