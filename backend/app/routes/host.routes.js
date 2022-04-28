module.exports = app => {
  const host = require('../controllers/host.controller.js')

  const router = require('express').Router()

  // Create a new Host
  router.post('/', host.create)

  // Retrieve all Host
  router.get('/', host.findAll)

  // Retrieve a single Host with (mac, ip, port, other_port, direction)
  router.get('/:mac/:ip/:plc_port/:other_port/:direction', host.findOne)

  // Update a Host with (mac, ip, port, other_port, direction)
  router.put('/:mac/:ip/:plc_port/:other_port/:direction', host.update)

  // Delete a Host with (mac, ip, port, other_port,direction)
  router.delete('/:mac/:ip/:plc_port/:other_port/:direction', host.delete)

  // Delete a new Host
  router.delete('/', host.deleteAll)

  app.use('/api/host', router)
}
