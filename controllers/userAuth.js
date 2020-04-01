let jwt = require('jsonwebtoken');
let secret = 'm1k5s6key'

function generateToken(user){
    let payload = {
        email : user.email,
        password : user.password
    }
    return jwt.sign(payload,secret);
}

function checkUserToken(token){
    return jwt.verify(token,secret);
}

module.exports = {generateToken,checkUserToken};