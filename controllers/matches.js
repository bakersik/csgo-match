const Match = require('../models/match')
const Tournament = require('../models/tournament')
const Team = require('../models/team')

module.exports.showMatches = async (req, res) => {
    const tournament = await Tournament.findById(req.params.id).populate('teams').populate('matches')
    res.render('tournaments/matches/show', { tournament })
}

module.exports.renderNewForm = async (req, res) => {
    const tournament = await Tournament.findById(req.params.id).populate('teams').populate('matches')
    res.render('tournaments/matches/new', { tournament })
}

module.exports.createMatch = async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    const match = new Match(req.body.match)
    tournament.matches.push(match)
    await match.save()
    await tournament.save()
    req.flash('success', 'Created new match!')
    res.redirect(`/tournaments/${tournament._id}/matches`)
}