const express = require('express')
const router = express.Router()
const tournaments = require('../controllers/tournaments')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isOwner, validateTournament } = require('../middleware')
const Tournament = require('../models/tournament')

router.route('/')
    .get(catchAsync(tournaments.index))
    .post(isLoggedIn, validateTournament, catchAsync(tournaments.createTournament))

router.get('/new', isLoggedIn, tournaments.renderNewForm)

router.route('/:id')
    .get(catchAsync(tournaments.showTournament))
    .put(isLoggedIn, isOwner, validateTournament, catchAsync(tournaments.editTournament))
    .delete(isLoggedIn, isOwner, catchAsync(tournaments.deleteTournament))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(tournaments.renderEditForm))

module.exports = router