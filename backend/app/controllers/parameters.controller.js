const db = require('../models')
const Parameters = db.parameters
const Op = db.Sequelize.Op

// Create and Save a new Parameter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Name) {
    res.status(400).send({
      message: `Content can not be empty! ${req.body.Name}`
    })
    return
  }

  // Create a row
  const parameter = {
    Name: req.body.Name,
    Value: req.body.Value
  }

  // Save Parameters in the database
  Parameters.create(parameter)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Parameter.'
      })
    })
}

// Retrieve all Parameters from the database.
exports.findAll = (req, res) => {
  const Name = req.query.Name
  const condition = Name ? { Name: { [Op.like]: `%${Name}%` }} : null

  Parameters.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Parameters.'
      })
    })
}

// Find a single Parameter with an Name
exports.findOne = (req, res) => {
  const Name = req.params.Name

  Parameters.findByPk(Name)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving Parameter with Name=' + Name
      })
    })
}

// Update a Parameter by the Name in the request
exports.update = (req, res) => {
  const Name = req.body.Name

  Parameters.update(req.body, {
    where: { Name: Name }
  })
    .then(num => {
      if (num > 0) {
        res.send({
          message: 'Parameter was updated successfully.'
        })
      } else {
        res.send({
          message: `${num} Cannot update Parameter with Name=${Name}. Maybe Parameter was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Parameter with Name=${Name}`
      })
    })
}

// Delete a Parameter with the specified Name in the request
exports.delete = (req, res) => {
  const Name = req.params.Name

  Parameters.destroy({
    where: { Name: Name }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Parameter was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Parameter with Name=${Name}. Parameter was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Parameter with Name=' + Name
      })
    })
}

// Delete all Parameters from the database.
exports.deleteAll = (req, res) => {
  Parameters.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Parameters were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all Parameters.'
      })
    })
}

