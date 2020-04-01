let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adminSchema = new Schema({
    email : String,
    password : String,
});

let Admin = mongoose.model('Admin',adminSchema,'admins'); 

module.exports = { Admin };