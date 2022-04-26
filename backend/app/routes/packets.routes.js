module.exports = app => {
  const packets = require('../controllers/packets.controller.js')

  const router = require('express').Router()

  // Create a new Packet
  router.post('/', packets.create)

  // Retrieve all Packets
  router.get('/', packets.findAll)

  // Retrieve a single Packet with id
  router.get('/:id', packets.findOne)

  // Update a Packet with id
  router.put('/:id', packets.update)

  // Delete a Packet with id
  router.delete('/:id', packets.delete)

  // Delete a new Packet
  router.delete('/', packets.deleteAll)

  app.use('/api/packets', router)
}
