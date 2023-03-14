const express = require('express')
const router = express.Router({ mergeParams: true })
const matches = require('../controllers/matches')
const Tournament = require('../models/tournament')
const Team = require('../models/team')
const { validateTeam, isLoggedIn, isOwner } = require('../middleware')
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(matches.showMatches))

router.get('/new', isLoggedIn, isOwner, catchAsync(matches.renderNewForm))

router.post('/new', catchAsync(matches.createMatch))

router.delete('/:matchId', isLoggedIn, isOwner, catchAsync(matches.deleteMatch))

module.exports = router