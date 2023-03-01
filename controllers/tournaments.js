const Tournament = require('../models/tournament')

module.exports.index = async (req, res) => {
    const tournaments = await Tournament.find({})
    res.render('tournaments/index', { tournaments })
}

module.exports.renderNewForm = (req, res) => {
    res.render('tournaments/new')
}

module.exports.createTournament = async (req, res, next) => {
    const tournament = new Tournament(req.body.tournament)
    tournament.owner = req.user._id
    await tournament.save()
    req.flash('success', 'Successfully made a new tournament!')
    res.redirect(`/tournaments/${tournament._id}`)
}

module.exports.showTournament = async (req, res) => {
    const tournament = await Tournament.findById(req.params.id).populate('teams').populate('owner')
    if (!tournament) {
        req.flash('error', 'Cannot find that tournament!')
        res.redirect('/tournaments')
    }
    res.render('tournaments/show', { tournament })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params
    const tournament = await Tournament.findById(id)
    if (!tournament) {
        req.flash('error', 'Cannot find that tournament!')
        res.redirect('/tournaments')
    }
    res.render('tournaments/edit', { tournament })
}

module.exports.editTournament = async (req, res) => {
    const { id } = req.params
    const tournament = await Tournament.findByIdAndUpdate(id, { ...req.body.tournament })
    req.flash('success', 'Successfully updated tournament!')
    res.redirect(`/tournaments/${tournament._id}`)
}

module.exports.deleteTournament = async (req, res) => {
    const { id } = req.params
    await Tournament.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted tournament')
    res.redirect('/tournaments')
}