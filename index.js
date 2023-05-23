const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userController = require('./controllers/user')

const app = express()

// middlewares
app.use(express.json())

//routes
app.use('/user', userController)


// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`))