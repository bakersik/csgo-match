const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const Joi = require('joi')
const { tournamentSchema, teamSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const Tournament = require('./models/tournament')
const Team = require('./models/team')
const team = require('./models/team')

mongoose.connect('mongodb://localhost:27017/csgo-match')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const validateTournament = (req, res, next) => {
    const { error } = tournamentSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

const validateTeam = (req, res, next) => {
    const { error } = teamSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/tournaments', catchAsync(async (req, res) => {
    const tournaments = await Tournament.find({})
    res.render('tournaments/index', { tournaments })
}))

app.get('/tournaments/new', (req, res) => {
    res.render('tournaments/new')
})

app.post('/tournaments', validateTournament, catchAsync(async (req, res, next) => {
    // if (!req.body.tournament) throw new ExpressError('Invalid tournament data', 400)
    const tournament = new Tournament(req.body.tournament)
    await tournament.save()
    res.redirect(`/tournaments/${tournament._id}`)
}))

app.get('/tournaments/:id', catchAsync(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id).populate('teams')
    res.render('tournaments/show', { tournament })
}))

app.get('/tournaments/:id/edit', catchAsync(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    res.render('tournaments/edit', { tournament })
}))

app.put('/tournaments/:id', validateTournament, catchAsync(async (req, res) => {
    const { id } = req.params
    const tournament = await Tournament.findByIdAndUpdate(id, { ...req.body.tournament })
    res.redirect(`/tournaments/${tournament._id}`)
}))

app.delete('/tournaments/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    await Tournament.findByIdAndDelete(id)
    res.redirect('/tournaments')
}))

app.post('/tournaments/:id/teams', validateTeam, catchAsync(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    const team = new Team(req.body.team)
    tournament.teams.push(team)
    await team.save()
    await tournament.save()
    res.redirect(`/tournaments/${tournament._id}`)
}))

app.delete('/tournaments/:id/teams/:teamId', catchAsync(async (req, res) => {
    const { id, teamId } = req.params
    await Tournament.findByIdAndUpdate(id, { $pull: { teams: teamId } })
    await Team.findByIdAndDelete(teamId)
    res.redirect(`/tournaments/${id}`)
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh no, something went wrong'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})