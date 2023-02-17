const mongoose = require('mongoose')
const Tournament = require('../models/tournament')

mongoose.connect('mongodb://localhost:27017/csgo-match')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const seedDB = async () => {
    await Tournament.deleteMany({})
    const t = new Tournament({ name: 'csgo50' })
    await t.save()
}

seedDB()