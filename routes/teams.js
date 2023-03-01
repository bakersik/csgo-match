const express = require('express')
const router = express.Router({ mergeParams: true })
const teams = require('../controllers/teams')
const Tournament = require('../models/tournament')
const Team = require('../models/team')
const { validateTeam, isLoggedIn, isOwner } = require('../middleware')
const catchAsync = require('../utils/catchAsync')

router.post('/', isLoggedIn, isOwner, validateTeam, catchAsync(teams.createTeam))

router.delete('/:teamId', isLoggedIn, isOwner, catchAsync(teams.deleteTeam))

module.exports = router