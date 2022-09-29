require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const DATABASE_URI = process.env.DATABASE_URI
const cors = require('cors')
const nodemailer = require('nodemailer')
const EMAIL = process.env.EMAIL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

app.use(express.json())
app.use(cors())


const db = mongoose.connection
mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

db.once('open', ()=>{
    console.log("Mongo connected")
})

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 4000,
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
})
contactEmail.verify((error) =>{
    if (error) {
        console.log(error)
    } else {
        console.log("Rady to Send")
    }
})



app.get("/", (req, res) =>{
    res.send("Welcome Home")
})
app.post('/request/new', (req, res) => {
    const newInfo = req.body
})


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))