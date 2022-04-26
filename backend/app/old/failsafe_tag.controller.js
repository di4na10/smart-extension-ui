const db = require('../models')
const Failsafe_tag = db.failsafe_tag
const Op = db.Sequelize.Op

// Create and Save a new Failsafe_tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body.tag_id) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Failsafe_tag
  const failsafe_tag = {
    tag_id: req.body.tag_id,
    val: req.body.val
  }

  // Save Failsafe_tag in the database
  Failsafe_tag.create(failsafe_tag)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the failsafe_tag.'
      })
    })
}

// Retrieve all Failsafe_tag from the database.
exports.findAll = (req, res) => {
  const id = req.query.tag_id
  const condition = id ? { id: { [Op.like]: `%${id}%` }} : null

  Failsafe_tag.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving failsafe_tag.'
      })
    })
}

// Find a single Failsafe_tag with a tag_id
exports.findOne = (req, res) => {
  const id = req.params.tag_id

  Failsafe_tag.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving failsafe_tag with tag_id=' + id
      })
    })
}

// Update a Failsafe_tag by the id in the request
exports.update = (req, res) => {
  const id = req.params.tag_id

  Failsafe_tag.update(req.body, {
    where: { tag_id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Failsafe_tag was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update failsafe_tag with tag_id=${id}. Maybe failsafe_tag was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating failsafe_tag with tag_id=' + id
      })
    })
}

// Delete a Failsafe_tag with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.tag_id

  Failsafe_tag.destroy({
    where: { tag_id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Failsafe_tag was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete failsafe_tag with tag_id=${id}. Failsafe_tag was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete failsafe_tag with tag_id=' + id
      })
    })
}

// Delete all Failsafe_tag from the database.
exports.deleteAll = (req, res) => {
  Failsafe_tag.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} failsafe_tag were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all failsafe_tag.'
      })
    })
}

