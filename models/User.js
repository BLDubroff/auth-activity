const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    age: {
        type: Number,
        required: true
    }
})

module.exports =mongoose.model('User', userSchema)