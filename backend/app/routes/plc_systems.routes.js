module.exports = app => {
  const plc_systems = require('../controllers/plc_systems.controller.js')

  const router = require('express').Router()

  // Create a new PLC Systems
  router.post('/', plc_systems.create)

  // Retrieve all PLC Systems
  router.get('/', plc_systems.findAll)

  // Retrieve a single PLC Systems with PLC name
  router.get('/:plc_name', plc_systems.findOne)

  // Update a PLC Systems with PLC name
  router.put('/:plc_name', plc_systems.update)

  // Delete a PLC Systems with PLC name
  router.delete('/:plc_name', plc_systems.delete)

  // Delete PLC Systems
  router.delete('/', plc_systems.deleteAll)

  app.use('/api/plc_systems', router)
}
