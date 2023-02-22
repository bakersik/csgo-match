const mongoose = require('mongoose')
const Tournament = require('../models/tournament')

mongoose.connect('mongodb://localhost:27017/csgo-match')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})
//Tournament.deleteMany({})
Tournament.insertMany([
    {
        name: 'Turniej o puchar prezydenta Ciechanowa',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, rerum porro? Repellendus quia cumque blanditiis necessitatibus corporis alias dolore. Repudiandae error voluptatibus libero amet. Ducimus, odit quo. Id, distinctio facere.',
        start_at: '2023-05-31',
        prize: 5000
    },
    {
        name: 'Ogolnopolskie zawody w wyciaganiu penisa z wody',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, rerum porro? Repellendus quia cumque blanditiis necessitatibus corporis alias dolore. Repudiandae error voluptatibus libero amet. Ducimus, odit quo. Id, distinctio facere.',
        start_at: '2023-02-13',
        prize: 6699
    },
    {
        name: 'Dreamhack Poland edition',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, rerum porro? Repellendus quia cumque blanditiis necessitatibus corporis alias dolore. Repudiandae error voluptatibus libero amet. Ducimus, odit quo. Id, distinctio facere.',
        start_at: '2023-05-31',
        prize: 10000
    },
    {
        name: 'IEM Katowice w Spodku',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, rerum porro? Repellendus quia cumque blanditiis necessitatibus corporis alias dolore. Repudiandae error voluptatibus libero amet. Ducimus, odit quo. Id, distinctio facere.',
        start_at: '2023-04-30',
        prize: 15000
    }
]).then(function () {
    console.log("Data inserted")
}).catch(function (error) {
    console.log(error)
});