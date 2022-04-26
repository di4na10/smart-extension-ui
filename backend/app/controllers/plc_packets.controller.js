const db = require('../models')
const PLC_Packets = db.PLC_Packets
const Op = db.Sequelize.Op

// Create and Save a new PLC Packet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.plc_name) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a PLC Packets
  const packets = {
    plc_name: req.body.plc_name,
    out_packets: req.body.out_packets,
    in_packets: req.body.in_packets,
    mean_inbound: req.body.mean_inbound,
    mean_outbound: req.body.mean_outbound,
    timestamp_start: req.body.timestamp_start,
    timestamp_stop: req.body.timestamp_stop,
    mean_in_1: req.body.mean_in_1,
    mean_in_2: req.body.mean_in_2,
    mean_in_3: req.body.mean_in_3,
    mean_out_1: req.body.mean_out_1,
    mean_out_2: req.body.mean_out_2,
    mean_out_3: req.body.mean_out_3
  }

  // Save PLC Packet in the database
  PLC_Packets.create(packets)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the PLC Packets.'
      })
    })
}

// Retrieve all PLC Packets from the database.
exports.findAll = (req, res) => {
  const plc_name = req.query.plc_name
  const condition = plc_name ? { plc_name: { [Op.like]: `%${plc_name}%` }} : null

  PLC_Packets.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving PLC Packets.'
      })
    })
}

// Find a single PLC Packet with an plc_name
exports.findOne = (req, res) => {
  const plc_name = req.params.plc_name

  PLC_Packets.findByPk(plc_name)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving PLC Packets with PLC name=' + plc_name
      })
    })
}

// Update a PLC Packets by the PLC name in the request
exports.update = (req, res) => {
  const plc_name = req.params.plc_name

  PLC_Packets.update(req.body, {
    where: { plc_name: plc_name }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'PLC Packets was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update PLC Packets with PLC name=${plc_name}. Maybe PLC Packets was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating PLC Packets with PLC name=' + plc_name
      })
    })
}

// Delete a PLC Packets with the specified PLC name in the request
exports.delete = (req, res) => {
  const plc_name = req.params.plc_name

  PLC_Packets.destroy({
    where: { plc_name: plc_name }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'PLC Packet was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete PLC Packets with PLC name=${plc_name}. PLC Packets was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete PLC Packets with PLC name=' + plc_name
      })
    })
}

// Delete all PLC Packets from the database.
exports.deleteAll = (req, res) => {
  PLC_Packets.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} PLC Packets were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all PLC Packets.'
      })
    })
}

