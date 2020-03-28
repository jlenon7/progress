const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./app/controllers/OngController')
const ProfileController = require('./app/controllers/ProfileController')
const IncidentController = require('./app/controllers/IncidentController')
const SessionController = require('./app/controllers/SessionController')

const routes = express.Router()

// Sessão
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.store)

// Ongs Routes
routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3).max(10),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.store)

// Profile
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), ProfileController.index)

// Incidents Routes
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index)

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(4).max(10),
        description: Joi.string().required().min(10).max(50),
        value: Joi.number().required(),
    })
}), IncidentController.store)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete)

module.exports = routes;