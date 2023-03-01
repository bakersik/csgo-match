const { tournamentSchema, teamSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Tournament = require('./models/tournament')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!')
        return res.redirect('/login')
    }
    next()
}

module.exports.validateTournament = (req, res, next) => {
    const { error } = tournamentSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params
    const tournament = await Tournament.findById(id)
    if (!tournament.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/tournaments/${id}`)
    }
    next()
}

module.exports.validateTeam = (req, res, next) => {
    const { error } = teamSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}