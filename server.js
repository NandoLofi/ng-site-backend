require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const DATABASE_URI = process.env.DATABASE_URI

const db = mongoose.connection
mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

db.once('open', ()=>{
    console.log("Mongo connected")
})


app.get("/", (req, res) =>{
    res.send("Welcome Home")
})

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))