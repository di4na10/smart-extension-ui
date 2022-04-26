const db = require('../models')
const Tag = db.tag
const Op = db.Sequelize.Op

// Create and Save a new Tag
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.name) && (!req.body.plc_name)) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Tag
  const tag = {
    tag_id: req.body.tag_id,
    name: req.body.name,
    plc_name: req.body.plc_name,
    val: req.body.val,
    type: req.body.type,
    protocol: req.body.protocol,
    timestamp: req.body.timestamp,
    min: req.body.min,
    max: req.body.max,
    range_min: req.body.range_min,
    range_max: req.body.range_max,
    active: req.body.active,
    message: req.body.message,
    index_offset: req.body.index_offset,
    handle: req.body.handle
  }

  // Save Tag in the database
  Tag.create(tag)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Tag.'
      })
    })
}

// Retrieve all Tag from the database.
exports.findAll = (req, res) => {
  const name = req.query.name
  const condition1 = name ? { name: { [Op.like]: `%${name}%` }} : null
  const plc_name = req.query.plc_name
  const condition2 = plc_name ? { plc_name: { [Op.like]: `%${plc_name}%` }} : null

  Tag.findAll({ where: {
    [Op.and]:
        [condition1, condition2]
  }})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Tag.'
      })
    })
}

// Find a single Tag with (name, plc_name)
exports.findOne = (req, res) => {
  const name = req.params.name
  const plc_name = req.params.plc_name

  Tag.findOne({ where: {
    name: name,
    plc_name: plc_name
  }})
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Tag with name=${name} and plc_name=${plc_name}.`
      })
    })
}

// Update a Tag by the (name, plc_name) in the request
exports.update = (req, res) => {
  const name = req.params.name
  const plc_name = req.params.plc_name

  Tag.update(req.body, {
    where: {
      name: name,
      plc_name: plc_name
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Tag was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Tag with name=${name} and plc_name=${plc_name}. Maybe Tag was not found, req.body is empty or there has been no changes!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Tag with name=${name} and plc_name=${plc_name}.`
      })
    })
}

// Delete a Tag with the specified (name, plc_name) in the request
exports.delete = (req, res) => {
  const name = req.params.name
  const plc_name = req.params.plc_name

  Tag.destroy({
    where: {
      name: name,
      plc_name: plc_name
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Tag was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Tag with name=${name} and plc_name=${plc_name}. Tag was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Tag with name=${name} and plc_name=${plc_name}.`
      })
    })
}

// Delete all Tag from the database.
exports.deleteAll = (req, res) => {
  Tag.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tags were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all Tag.'
      })
    })
}

