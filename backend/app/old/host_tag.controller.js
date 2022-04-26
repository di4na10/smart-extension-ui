const db = require('../models')
const Host_tag = db.host_tag
const Op = db.Sequelize.Op

// Create and Save a new Host_tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body.host_id) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Host_tag
  const host_tag = {
    host_id: req.body.host_id,
    tag_id: req.body.tag_id
  }

  // Save Host_tag in the database
  Host_tag.create(host_tag)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the host_tag.'
      })
    })
}

// Retrieve all Host_tag from the database.
exports.findAll = (req, res) => {
  const id = req.query.tag_id
  const condition = id ? { id: { [Op.like]: `%${id}%` }} : null

  Host_tag.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving host_tag.'
      })
    })
}

// Find a single Host_tag with a tag_id
exports.findOne = (req, res) => {
  const id = req.params.tag_id

  Host_tag.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving host_tag with tag_id=' + id
      })
    })
}

// Update a Host_tag by the id in the request
exports.update = (req, res) => {
  const id = req.params.tag_id

  Host_tag.update(req.body, {
    where: { tag_id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Host_tag was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update host_tag with tag_id=${id}. Maybe host_tag was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating host_tag with tag_id=' + id
      })
    })
}

// Delete a Host_tag with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.tag_id

  Host_tag.destroy({
    where: { tag_id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Host_tag was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete host_tag with tag_id=${id}. Host_tag was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete host_tag with tag_id=' + id
      })
    })
}

// Delete all Failsafe_tag from the database.
exports.deleteAll = (req, res) => {
  Host_tag.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} host_tag were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all host_tag.'
      })
    })
}

