const db = require('../models')
const Write_Whitelist = db.Write_Whitelist
const Op = db.Sequelize.Op

// Create and Save a new Write Whitelist
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.ip_src) && (!req.body.ip_dst)) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Write Whitelist
  const write_whitelist = {
    ip_src: req.body.ip_src,
    ip_dst: req.body.ip_dst,
    active: req.body.active
  }

  // Save Write Whitelist in the database
  Write_Whitelist.create(write_whitelist)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Write Whitelist.'
      })
    })
}

// Retrieve all Write Whitelists from the database.
exports.findAll = (req, res) => {
  const ip_src = req.query.ip_src
  const condition1 = ip_src ? { ip_src: { [Op.like]: `%${ip_src}%` }} : null
  const ip_dst = req.query.ip_dst
  const condition2 = ip_dst ? { ip_dst: { [Op.like]: `%${ip_dst}%` }} : null

  Write_Whitelist.findAll({ where: {
    [Op.and]:
      [condition1, condition2]
  }}).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Write Whitelists.'
      })
    })
}

// Find a single Write Whitelist with an (ip_src, ip_dst)
exports.findOne = (req, res) => {
  const ip_src = req.params.ip_src
  const ip_dst = req.params.ip_dst

  Write_Whitelist.findOne({ where: {
    ip_src: ip_src,
    ip_dst: ip_dst
  }}).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving one Write Whitelist.'
      })
    })
}

// Update a Write Whitelist by the (ip_src, ip_dst) in the request
exports.update = (req, res) => {
  const ip_src = req.params.ip_src
  const ip_dst = req.params.ip_dst

  Write_Whitelist.update(req.body, {
    where: {
      ip_src: ip_src,
      ip_dst: ip_dst
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Write Whitelist was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Write Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}. Maybe Write Whitelist was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Write Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}.`
      })
      res.status(404).send({
        message: `Error updating Write Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}.`
      })
    })
}

// Delete a Write Whitelist with the specified (ip_src, ip_dst) in the request
exports.delete = (req, res) => {
  const ip_src = req.params.ip_src
  const ip_dst = req.params.ip_dst

  Write_Whitelist.destroy({
    where: {
      ip_src: ip_src,
      ip_dst: ip_dst
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Write Whitelist was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Write Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}. Maybe Write Whitelist was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Write Whitelist with ip_src=${ip_src} and ip_dst=${ip_dst}.`
      })
    })
}

// Delete all Write Whitelist from the database.
exports.deleteAll = (req, res) => {
  Write_Whitelist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Write Whitelists were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all Write Whitelists.'
      })
    })
}

