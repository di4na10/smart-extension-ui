const db = require('../models')
const Alarms = db.alarms
const Op = db.Sequelize.Op

// Create and Save a new Alarms
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: `Content can not be empty! ${req.body.id}`
    })
    return
  }

  // Create a row
  const alarm = {
    id: req.body.id,
    level: req.body.level,
    name: req.body.name,
    description: req.body.description,
    ip_src: req.body.ip_src,
    ip_dst: req.body.ip_dst,
    timestamp: req.body.timestamp
  }

  // Save Alarms in the database
  Alarms.create(alarm)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Alarms.'
      })
    })
}

// Retrieve all Alarms from the database.
exports.findAll = (req, res) => {
  const id = req.query.id
  const condition = id ? { id: { [Op.like]: `%${id}%` }} : null

  Alarms.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Alarms.'
      })
    })
}

// Find a single Alarm with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Alarms.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving Alarms with id=' + id
      })
    })
}

// Update a Alarm by the id in the request
exports.update = (req, res) => {
  const id = req.body.id

  Alarms.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num > 0) {
        res.send({
          message: 'Alarm was updated successfully.'
        })
      } else {
        res.send({
          message: `${num} Cannot update Alarm with id=${id}. Maybe Alarm was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Alarm with id=${id}`
      })
    })
}

// Delete a Alarm with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Alarms.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Alarm was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Alarm with id=${id}. Alarms was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Alarms with id=' + id
      })
    })
}

// Delete all Alarm from the database.
exports.deleteAll = (req, res) => {
  Alarms.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Alarms were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all alarms.'
      })
    })
}

