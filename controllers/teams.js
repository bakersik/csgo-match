const Tournament = require('../models/tournament')
const Team = require('../models/team')

module.exports.createTeam = async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
    const team = new Team(req.body.team)
    tournament.teams.push(team)
    await team.save()
    await tournament.save()
    req.flash('success', 'Created new team!')
    res.redirect(`/tournaments/${tournament._id}`)
}

module.exports.deleteTeam = async (req, res) => {
    const { id, teamId } = req.params
    await Tournament.findByIdAndUpdate(id, { $pull: { teams: teamId } })
    await Team.findByIdAndDelete(teamId)
    req.flash('success', 'Successfully deleted team!')
    res.redirect(`/tournaments/${id}`)
}