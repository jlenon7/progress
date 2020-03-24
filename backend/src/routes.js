const express = require('express')

const OngController = require('./app/controllers/OngController')
const ProfileController = require('./app/controllers/ProfileController')
const IncidentController = require('./app/controllers/IncidentController')
const SessionController = require('./app/controllers/SessionController')

const routes = express.Router()

// Sessão
routes.post('/sessions', SessionController.store)

// Ongs Routes
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store)

// Profile
routes.get('/profile', ProfileController.index)

// Incidents Routes
routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.store)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;