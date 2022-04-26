const db = require('../models')
const Routes = db.Routes
const Op = db.Sequelize.Op

// Create and Save a new Route
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: `Content can not be empty! ${req.body.id}`
    })
    return
  }

  // Create a row
  const route = {
    id: req.body.id,
    host_name: req.body.host_name,
    ip_address: req.body.ip_address,
    MAC: req.body.MAC,
    ams_netid: req.body.ams_netid,
    TwinCAT: req.body.TwinCAT,
    OS_version: req.body.OS_version,
    type: req.body.type,
    whitelist: req.body.whitelist
  }

  // Save Route in the database
  Routes.create(route)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Routes.'
      })
    })
}

// Retrieve all Routes from the database.
exports.findAll = (req, res) => {
  const id = req.query.id
  const condition = id ? { id: { [Op.like]: `%${id}%` }} : null

  Routes.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Routes.'
      })
    })
}

// Find a single Route with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Routes.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving Routes with id=' + id
      })
    })
}

// Update a Routes by the id in the request
exports.update = (req, res) => {
  const id = req.body.id

  Routes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num > 0) {
        res.send({
          message: 'Routes was updated successfully.'
        })
      } else {
        res.send({
          message: `${num} Cannot update Routes with id=${id}. Maybe Routes was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Routes with id=${id}`
      })
    })
}

// Delete a Routes with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Routes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Routes was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Routes with id=${id}. Routes was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Routes with id=' + id
      })
    })
}

// Delete all Routes from the database.
exports.deleteAll = (req, res) => {
  Routes.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Routes were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all Routes.'
      })
    })
}

