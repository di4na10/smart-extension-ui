const db = require('../models')
const SCADA_Systems = db.SCADA_Systems
const Op = db.Sequelize.Op

// Create and Save a new SCADA System
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty! ${req.body.name}`
    })
    return
  }

  // Create a row
  const scada_system = {
    name: req.body.name,
    ip: req.body.ip,
    mac: req.body.mac
  }

  // Save SCADA Systems in the database
  SCADA_Systems.create(scada_system)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the SCADA Systems.'
      })
    })
}

// Retrieve all SCADA Systems from the database.
exports.findAll = (req, res) => {
  const name = req.query.name
  const condition = name ? { name: { [Op.like]: `%${name}%` }} : null

  SCADA_Systems.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving SCADA Systems.'
      })
    })
}

// Find a single SCADA System with a name
exports.findOne = (req, res) => {
  const name = req.params.name

  SCADA_Systems.findByPk(name)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving SCADA System with name=' + name
      })
    })
}

// Update a SCADA System by the name in the request
exports.update = (req, res) => {
  const name = req.body.name

  SCADA_Systems.update(req.body, {
    where: { name: name }
  })
    .then(num => {
      if (num > 0) {
        res.send({
          message: 'SCADA System was updated successfully.'
        })
      } else {
        res.send({
          message: `${num} Cannot update SCADA System with name=${name}. Maybe SCADA System was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating SCADA System with name=${name}`
      })
    })
}

// Delete a SCADA System with the specified id in the request
exports.delete = (req, res) => {
  const name = req.params.name

  SCADA_Systems.destroy({
    where: { name: name }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'SCADA System was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete SCADA System with name=${name}. SCADA System was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete SCADA System with name=' + name
      })
    })
}

// Delete all SCADA System from the database.
exports.deleteAll = (req, res) => {
  SCADA_Systems.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} SCADA Systems were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all SCADA Systems.'
      })
    })
}

