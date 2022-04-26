module.exports = app => {
  const host = require('../controllers/host.controller.js')

  const router = require('express').Router()

  // Create a new Host
  router.post('/', host.create)

  // Retrieve all Host
  router.get('/', host.findAll)

  // Retrieve a single Host with (mac, ip, port)
  router.get('/:mac/:ip/:port', host.findOne)

  // Update a Host with (mac, ip, port)
  router.put('/:mac/:ip/:port', host.update)

  // Delete a Host with (mac, ip, port)
  router.delete('/:mac/:ip/:port', host.delete)

  // Delete a new Host
  router.delete('/', host.deleteAll)

  app.use('/api/host', router)
}
