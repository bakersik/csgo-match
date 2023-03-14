const Joi = require('joi')

module.exports.tournamentSchema = Joi.object({
    tournament: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        start_at: Joi.date().required(),
        end_at: Joi.date(),
        prize: Joi.number().required().min(0)
    }).required()
})

module.exports.teamSchema = Joi.object({
    team: Joi.object({
        name: Joi.string().required(),
        avatar_url: Joi.string().allow(''),
        steamgroup_url: Joi.string().allow(''),
        description: Joi.string().allow(''),
        matches_won: Joi.number(),
        matches_lost: Joi.number(),
        member1: Joi.string().required(),
        member2: Joi.string().required(),
        member3: Joi.string().required(),
        member4: Joi.string().required(),
        member5: Joi.string().required(),
    }).required()
})

