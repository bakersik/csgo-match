const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: String,
    avatar_url: String,
    steamgroup_url: String,
    description: String
})

module.exports = mongoose.model('Team', teamSchema)