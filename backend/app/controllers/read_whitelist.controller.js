const db = require('../models')
const Read_Whitelist = db.Read_Whitelist
const Op = db.Sequelize.Op

// Create and Save a new Read Whitelist
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.ip_src) && (!req.body.ip_dst)) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Read Whitelist
  const read_whitelist = {
    ip_src: req.body.ip_src,
    ip_dst: req.body.ip_dst,
    active: req.body.active
  }

  // Save Read Whitelist in the database
  Read_Whitelist.create(read_whitelist)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Read Whitelist.'
      })
    })
}

// Retrieve all Read Whitelists from the database.
exports.findAll = (req, res) => {
  const ip_src = req.query.ip_src
  const condition1 = ip_src ? { ip_src: { [Op.like]: `%${ip_src}%` }} : null
  const ip_dst = req.query.ip_dst
  const condition2 = ip_dst ? { ip_dst: { [Op.like]: `%${ip_dst}%` }} : null

  Read_Whitelist.findAll({ where: {
    [Op.and]:
      [condition1, condition2]
  }}).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Read Whitelists.'
      })
    })
}

// Find a single Read Whitelist with an (ip_src, ip_dst)
exports.findOne = (req, res) => {
  const ip_src = req.params.ip_src
  const ip_dst = req.params.ip_dst

  Read_Whitelist.findOne({ where: {
    ip_src: ip_src,
    ip_dst: ip_dst
  }}).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving one Read Whitelist.'
      })
    })
}

// Update a Read Whitelist by the (ip_src, ip_dst) in the request
exports.update = (req, res) => {
  const ip_src = req.params.ip_src
  const ip_dst = req.params.ip_dst

  Read_Whitelist.update(req.body, {
    where: {
      ip_src: ip_src,
      ip_dst: ip_dst
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Read Whitelist was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Read Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}. Maybe Read Whitelist was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Read Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}.`
      })
      res.status(404).send({
        message: `Error updating Read Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}.`
      })
    })
}

// Delete a Read Whitelist with the specified (ip_src, ip_dst) in the request
exports.delete = (req, res) => {
  const ip_src = req.params.ip_src
  const ip_dst = req.params.ip_dst

  Read_Whitelist.destroy({
    where: {
      ip_src: ip_src,
      ip_dst: ip_dst
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Read Whitelist was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Read Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}. Maybe Read Whitelist was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Read Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}.`
      })
    })
}

// Delete all Read Whitelist from the database.
exports.deleteAll = (req, res) => {
  Read_Whitelist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Read Whitelists were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all Read Whitelists.'
      })
    })
}

