module.exports = app => {
  const parameters = require('../controllers/parameters.controller.js')

  const router = require('express').Router()

  // Create a new Parameter
  router.post('/', parameters.create)

  // Retrieve all Parameters
  router.get('/', parameters.findAll)

  // Retrieve a single Parameter with name
  router.get('/:Name', parameters.findOne)

  // Update a Parameter with name
  router.put('/:Name', parameters.update)

  // Delete a Parameter with name
  router.delete('/:Name', parameters.delete)

  // Delete a new Parameter
  router.delete('/', parameters.deleteAll)

  app.use('/api/parameters', router)
}
