const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TournamentSchema = new Schema({
    name: String,
    description: String,
    start_at: Date,
    prize: Number
})

module.exports = mongoose.model('Tournament', TournamentSchema)