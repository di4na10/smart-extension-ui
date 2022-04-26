const db = require('../models')
const Net_Conf = db.Net_Conf
const Op = db.Sequelize.Op

// Create and Save a new Net Conf
exports.create = (req, res) => {
  // Validate request
  if (!req.body.parameter) {
    res.status(400).send({
      message: `Content can not be empty! ${req.body.Name}`
    })
    return
  }

  // Create a row
  const net_conf = {
    parameter: req.body.parameter,
    value: req.body.value
  }

  // Save Net Conf in the database
  Net_Conf.create(net_conf)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Net Conf.'
      })
    })
}

// Retrieve all Net Conf from the database.
exports.findAll = (req, res) => {
  const parameter = req.query.parameter
  const condition = parameter ? { parameter: { [Op.like]: `%${parameter}%` }} : null

  Net_Conf.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Net Conf.'
      })
    })
}

// Find a single Net Conf with an parameter
exports.findOne = (req, res) => {
  const parameter = req.params.parameter

  Net_Conf.findByPk(parameter)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving Net Conf with parameter=' + parameter
      })
    })
}

// Update a Net Conf by the parameter in the request
exports.update = (req, res) => {
  const parameter = req.body.parameter

  Net_Conf.update(req.body, {
    where: { parameter: parameter }
  })
    .then(num => {
      if (num > 0) {
        res.send({
          message: 'Net Conf was updated successfully.'
        })
      } else {
        res.send({
          message: `${num} Cannot update Net Conf with parameter=${parameter}. Maybe Net Conf was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Net Conf with parameter=${parameter}`
      })
    })
}

// Delete a Net Conf with the specified parameter in the request
exports.delete = (req, res) => {
  const parameter = req.params.parameter

  Net_Conf.destroy({
    where: { parameter: parameter }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Net Conf was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Net Conf with parameter=${parameter}. Net Conf was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Net Conf with parameter=' + parameter
      })
    })
}

// Delete all Net Conf from the database.
exports.deleteAll = (req, res) => {
  Net_Conf.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Net Conf were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all Net Conf.'
      })
    })
}

