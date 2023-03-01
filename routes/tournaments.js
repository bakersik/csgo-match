const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isOwner, validateTournament } = require('../middleware')
const Tournament = require('../models/tournament')

router.get('/', catchAsync(async (req, res) => {
    const tournaments = await Tournament.find({})
    res.render('tournaments/index', { tournaments })
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('tournaments/new')
})

router.post('/', isLoggedIn, validateTournament, catchAsync(async (req, res, next) => {
    const tournament = new Tournament(req.body.tournament)
    tournament.owner = req.user._id
    await tournament.save()
    req.flash('success', 'Successfully made a new tournament!')
    res.redirect(`/tournaments/${tournament._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id).populate('teams').populate('owner')
    if (!tournament) {
        req.flash('error', 'Cannot find that tournament!')
        res.redirect('/tournaments')
    }
    res.render('tournaments/show', { tournament })
}))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const { id } = req.params
    const tournament = await Tournament.findById(id)
    if (!tournament) {
        req.flash('error', 'Cannot find that tournament!')
        res.redirect('/tournaments')
    }
    res.render('tournaments/edit', { tournament })
}))

router.put('/:id', isLoggedIn, isOwner, validateTournament, catchAsync(async (req, res) => {
    const { id } = req.params
    const tournament = await Tournament.findByIdAndUpdate(id, { ...req.body.tournament })
    req.flash('success', 'Successfully updated tournament!')
    res.redirect(`/tournaments/${tournament._id}`)
}))

router.delete('/:id', isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const { id } = req.params
    await Tournament.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted tournament')
    res.redirect('/tournaments')
}))

module.exports = router