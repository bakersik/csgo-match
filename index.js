const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const Tournament = require('./models/tournament')

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

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/tournaments', async (req, res) => {
    const tournaments = await Tournament.find({})
    res.render('tournaments/index', { tournaments })
})

app.get('/tournaments/new', (req, res) => {
    res.render('tournaments/new')
})

app.post('/tournaments', async (req, res) => {
    const tournament = new Tournament(req.body.tournament)
    await tournament.save()
    res.redirect(`/tournaments/${tournament._id}`)
})

app.get('/tournaments/:id', async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    res.render('tournaments/show', { tournament })
})

app.get('/tournaments/:id/edit', async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    res.render('tournaments/edit', { tournament })
})

app.put('/tournaments/:id', async (req, res) => {
    const { id } = req.params
    const tournament = await Tournament.findByIdAndUpdate(id, { ...req.body.tournament })
    res.redirect(`/tournaments/${tournament._id}`)
})

app.delete('/tournaments/:id', async (req, res) => {
    const { id } = req.params
    await Tournament.findByIdAndDelete(id)
    res.redirect('/tournaments')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})