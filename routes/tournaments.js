const express = require('express')
const router = express.Router()
const Tournament = require('../models/tournament')
const { tournamentSchema, teamSchema } = require('../schemas')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const validateTournament = (req, res, next) => {
    const { error } = tournamentSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.get('/', catchAsync(async (req, res) => {
    const tournaments = await Tournament.find({})
    res.render('tournaments/index', { tournaments })
}))

router.get('/new', (req, res) => {
    res.render('tournaments/new')
})

router.post('/', validateTournament, catchAsync(async (req, res, next) => {
    const tournament = new Tournament(req.body.tournament)
    await tournament.save()
    res.redirect(`/tournaments/${tournament._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id).populate('teams')
    res.render('tournaments/show', { tournament })
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    res.render('tournaments/edit', { tournament })
}))

router.put('/:id', validateTournament, catchAsync(async (req, res) => {
    const { id } = req.params
    const tournament = await Tournament.findByIdAndUpdate(id, { ...req.body.tournament })
    res.redirect(`/tournaments/${tournament._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    await Tournament.findByIdAndDelete(id)
    res.redirect('/tournaments')
}))

module.exports = router