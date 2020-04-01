let jwt = require('jsonwebtoken');
let secret = 'hoper2020csc470'

function generateToken(admin){
    let payload = {
        email : admin.email,
        password : admin.password
    }

    return jwt.sign(payload,secret);
}


function checkToken(token) {
    return jwt.verify(token,secret);
}

module.exports = { generateToken, checkToken };

