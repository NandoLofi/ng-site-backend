const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String,
})

const infoRequest = mongoose.model('infodetails', infoSchema)
module.exports = infoRequest