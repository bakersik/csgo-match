const mongoose = require('mongoose')
const Team = require('./team')
const Schema = mongoose.Schema

const TournamentSchema = new Schema({
    name: String,
    description: String,
    start_at: Date,
    prize: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teams: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }
    ]
})

TournamentSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Team.deleteMany({
            _id: {
                $in: doc.teams
            }
        })
    }
})

module.exports = mongoose.model('Tournament', TournamentSchema)