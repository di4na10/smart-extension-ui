const db = require('../models')
const Packets = db.packets
const Op = db.Sequelize.Op

// Create and Save a new Packet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.MAC_src) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Packets
  const packets = {
    MAC_src: req.body.MAC_src,
    MAC_dst: req.body.MAC_dst,
    IP_src: req.body.IP_src,
    IP_dst: req.body.IP_dst,
    payload: req.body.payload,
    time: req.body.time,
    flag: req.body.flag
  }

  // Save Packet in the database
  Packets.create(packets)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Packets.'
      })
    })
}

// Retrieve all Packets from the database.
exports.findAll = (req, res) => {
  const id = req.query.id
  const condition = id ? { id: { [Op.like]: `%${id}%` }} : null

  Packets.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving packets.'
      })
    })
}

// Find a single Packet with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Packets.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving Packets with id=' + id
      })
    })
}

// Update a Packets by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Packets.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Packets was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Packets with id=${id}. Maybe Packets was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating Packets with id=' + id
      })
    })
}

// Delete a Packets with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Packets.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Packet was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Packets with id=${id}. Packets was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Packets with id=' + id
      })
    })
}

// Delete all Packets from the database.
exports.deleteAll = (req, res) => {
  Packets.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Packets were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all packets.'
      })
    })
}

