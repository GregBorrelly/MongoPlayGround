const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String
})

// Creating user model. Mongoose checks 
// if user exist before creating it
const User = mongoose.model('user', UserSchema)


module.exports = User 