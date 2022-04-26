module.exports = app => {
  const routes = require('../controllers/routes.controller.js')

  const router = require('express').Router()

  // Create a new Route
  router.post('/', routes.create)

  // Retrieve all Routes
  router.get('/', routes.findAll)

  // Retrieve a single Route with index
  router.get('/:id', routes.findOne)

  // Update a Route with index
  router.put('/:id', routes.update)

  // Delete a Route with index
  router.delete('/:id', routes.delete)

  // Delete Routes
  router.delete('/', routes.deleteAll)

  app.use('/api/routes', router)
}
