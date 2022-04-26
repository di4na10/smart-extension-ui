const db = require('../models')
const PLC_Systems = db.PLC_Systems
const Op = db.Sequelize.Op

// Create and Save a new PLC System
exports.create = (req, res) => {
  // Validate request
  if (!req.body.plc_name) {
    res.status(400).send({
      message: `Content can not be empty! ${req.body.plc_name}`
    })
    return
  }

  // Create a row
  const plc_system = {
    plc_name: req.body.plc_name,
    ip: req.body.ip,
    mac: req.body.mac,
    PLC_AMS_ID: req.body.PLC_AMS_ID,
    active: req.body.active
  }

  // Save PLC Systems in the database
  PLC_Systems.create(plc_system)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the PLC Systems.'
      })
    })
}

// Retrieve all PLC Systems from the database.
exports.findAll = (req, res) => {
  const plc_name = req.query.plc_name
  const condition = plc_name ? { plc_name: { [Op.like]: `%${plc_name}%` }} : null

  PLC_Systems.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving PLC Systems.'
      })
    })
}

// Find a single PLC System with a PLC name
exports.findOne = (req, res) => {
  const plc_name = req.params.plc_name

  PLC_Systems.findByPk(plc_name)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving PLC System with PLC name=' + plc_name
      })
    })
}

// Update a PLC System by the PLC name in the request
exports.update = (req, res) => {
  const plc_name = req.body.plc_name

  PLC_Systems.update(req.body, {
    where: { plc_name: plc_name }
  })
    .then(num => {
      if (num > 0) {
        res.send({
          message: 'PLC System was updated successfully.'
        })
      } else {
        res.send({
          message: `${num} Cannot update PLC System with PLC name=${plc_name}. Maybe PLC System was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating PLC System with PLC name=${plc_name}`
      })
    })
}

// Delete a PLC System with the specified PLC name in the request
exports.delete = (req, res) => {
  const plc_name = req.params.plc_name

  PLC_Systems.destroy({
    where: { plc_name: plc_name }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'PLC System was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete PLC System with PLC name=${plc_name}. PLC System was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete PLC System with PLC name=' + plc_name
      })
    })
}

// Delete all PLC System from the database.
exports.deleteAll = (req, res) => {
  PLC_Systems.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} PLC Systems were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all PLC Systems.'
      })
    })
}

