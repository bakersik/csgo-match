const Joi = require('joi')

module.exports.tournamentSchema = Joi.object({
    tournament: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        start_at: Joi.date().required(),
        prize: Joi.number().required().min(0)
    }).required()
})

module.exports.teamSchema = Joi.object({
    team: Joi.object({
        name: Joi.string().required(),
        avatar_url: Joi.string().required()
    }).required()
})

