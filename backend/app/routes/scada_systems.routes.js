module.exports = app => {
  const scada_systems = require('../controllers/scada_systems.controller.js')

  const router = require('express').Router()

  // Create a new SCADA Systems
  router.post('/', scada_systems.create)

  // Retrieve all SCADA Systems
  router.get('/', scada_systems.findAll)

  // Retrieve a single SCADA Systems with name
  router.get('/:name', scada_systems.findOne)

  // Update a SCADA Systems with name
  router.put('/:name', scada_systems.update)

  // Delete a SCADA Systems with name
  router.delete('/:name', scada_systems.delete)

  // Delete a new SCADA Systems
  router.delete('/', scada_systems.deleteAll)

  app.use('/api/scada_systems', router)
}
