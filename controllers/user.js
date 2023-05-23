const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

router.get('/', async(req, res) =>{
    const users = await User.find()
    res.json(users)
})

router.post('/', async(req, res)=>{
    const { username, password, age } = req.body
    const user = await User.findOne({ username })

    if (user) {
        return res.status(422).json({message: 'user already exists'})
    }

    const createdUser = await new User({
        username,
        age,
        password: await bcrypt.hash(password, 10)
        //dont actually ever return the passwords even if they are salted and hashed
    }).save()

    const payload = {
        id: createdUser._id,
        username
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'})

    res.json({ token })
})

module.exports = router