const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                })
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean
            }
        }
    }
})

const Joi = BaseJoi.extend(extension)

module.exports.tournamentSchema = Joi.object({
    tournament: Joi.object({
        name: Joi.string().required().escapeHTML(),
        description: Joi.string().escapeHTML(),
        start_at: Joi.date().required(),
        end_at: Joi.date(),
        prize: Joi.number().required().min(0)
    }).required()
})

module.exports.teamSchema = Joi.object({
    team: Joi.object({
        name: Joi.string().required().escapeHTML(),
        avatar_url: Joi.string().allow('').escapeHTML(),
        steamgroup_url: Joi.string().allow('').escapeHTML(),
        description: Joi.string().allow('').escapeHTML(),
        matches_won: Joi.number(),
        matches_lost: Joi.number(),
        member1: Joi.string().required().escapeHTML(),
        member2: Joi.string().required().escapeHTML(),
        member3: Joi.string().required().escapeHTML(),
        member4: Joi.string().required().escapeHTML(),
        member5: Joi.string().required().escapeHTML(),
    }).required()
})

