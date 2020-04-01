let Admin = require('../models/admins').Admin;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');


router.post('/login',async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let admin = await Admin.find().where({ email: email });

    if(admin.length>0){
        let comparisonResult = await bcrypt.compare(password, admin[0].password);
        if(comparisonResult){
            let token = auth.generateToken(admin[0]);
            res.cookie('auth_token',token);
        
            res.send({
                redirectURL : '/admin'
            })
        }else{
            res.status(400);
            res.send('Rejected'); 
        }
       
    } else{
        res.status(400);
        res.send('Rejected');
    }
});

router.post('/register',async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let admin = await Admin.find().where({ email: email });

    if(admin.length === 0){
        let encryptedPass = await bcrypt.hash(password, 12);
        let newAdmin = new Admin({
            email : email,
            password : encryptedPass
        })
        await newAdmin.save();
        res.send('Done');
    } else{
        res.send('Rejected');
    }
});



module.exports = router;

