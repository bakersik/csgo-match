const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: String,
    avatar_url: String,
    steamgroup_url: String,
    description: String,
    matches_won: Number,
    matches_lost: Number,
    member1: String,
    member2: String,
    member3: String,
    member4: String,
    member5: String
})

module.exports = mongoose.model('Team', teamSchema)