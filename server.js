require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const nodemailer = require('nodemailer')
const EMAIL = process.env.EMAIL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

app.use(express.json())
app.use(cors())



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
app.post('/contact', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    const phone = req.body.phone
    const mail = {
        from: name, 
        to: "nge@ngexc.com",
        subject: "Request Information",
        html: `<p> Name: ${name}</p> <p> Email: ${email}</p> Messge: ${message} </p> <p> Phone: ${phone} </p>`,
    }
    contactEmail.sendMail(mail, (error)=> {
        if (error) {
            res.json({ status: "Error" })
        } else {
            res.json({ status: "Message Sent"})
        }
    })
})


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))