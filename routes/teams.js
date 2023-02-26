const express = require('express')
const router = express.Router({ mergeParams: true })
const Tournament = require('../models/tournament')
const Team = require('../models/team')
const { teamSchema } = require('../schemas')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const validateTeam = (req, res, next) => {
    const { error } = teamSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.post('/', validateTeam, catchAsync(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    const team = new Team(req.body.team)
    tournament.teams.push(team)
    await team.save()
    await tournament.save()
    req.flash('success', 'Created new team!')
    res.redirect(`/tournaments/${tournament._id}`)
}))

router.delete('/:teamId', catchAsync(async (req, res) => {
    const { id, teamId } = req.params
    await Tournament.findByIdAndUpdate(id, { $pull: { teams: teamId } })
    await Team.findByIdAndDelete(teamId)
    req.flash('success', 'Successfully deleted team!')
    res.redirect(`/tournaments/${id}`)
}))

module.exports = router