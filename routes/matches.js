const express = require('express')
const router = express.Router({ mergeParams: true })
const matches = require('../controllers/matches')
const Tournament = require('../models/tournament')
const Team = require('../models/team')
const { validateTeam, isLoggedIn, isOwner } = require('../middleware')
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(matches.showMatches))

router.get('/new', catchAsync(matches.renderNewForm))

module.exports = router