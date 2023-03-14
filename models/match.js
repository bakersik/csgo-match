const mongoose = require('mongoose')
const Team = require('./team')
const Schema = mongoose.Schema

const MatchSchema = new Schema({
    start_at: Date,
    team1: String,
    team2: String,
    team1_score: Number,
    team2_score: Number,
    winner: String
})

module.exports = mongoose.model('Match', MatchSchema)