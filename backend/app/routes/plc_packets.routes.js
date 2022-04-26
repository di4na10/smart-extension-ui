module.exports = app => {
  const plc_packets = require('../controllers/plc_packets.controller.js')

  const router = require('express').Router()

  // Create a new PLC Packet
  router.post('/', plc_packets.create)

  // Retrieve all PLC Packets
  router.get('/', plc_packets.findAll)

  // Retrieve a single PLC Packet with plc_name
  router.get('/:plc_name', plc_packets.findOne)

  // Update a PLC Packet with plc_name
  router.put('/:plc_name', plc_packets.update)

  // Delete a PLC Packet with plc_name
  router.delete('/:plc_name', plc_packets.delete)

  // Delete PLC Packet
  router.delete('/', plc_packets.deleteAll)

  app.use('/api/plc_packets', router)
}
