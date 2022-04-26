const db = require('../models')
const IP_whitelist = db.IP_whitelist
const Op = db.Sequelize.Op

// Create and Save a new IP Whitelist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.IP) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a IP Whitelist
  const ip_whitelist = {
    IP: req.body.IP
  }

  // Save IP Whitelist in the database
  IP_whitelist.create(ip_whitelist)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the IP Whitelist.'
      })
    })
}

// Retrieve all IP Whitelist from the database.
exports.findAll = (req, res) => {
  const IP = req.query.IP
  const condition = IP ? { IP: { [Op.like]: `%${IP}%` }} : null

  IP_whitelist.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving IP Whitelist.'
      })
    })
}

// Find a single IP Whitelist with a IP
exports.findOne = (req, res) => {
  const IP = req.params.IP

  IP_whitelist.findByPk(IP)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving IP Whitelist with IP=' + IP
      })
    })
}

// Update a IP Whitelist by the IP in the request
exports.update = (req, res) => {
  const IP = req.params.IP

  IP_whitelist.update(req.body, {
    where: { IP: IP }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'IP Whitelist was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update IP Whitelist with IP=${IP}. Maybe IP Whitelist was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating IP Whitelist with IP=' + IP
      })
    })
}

// Delete a IP Whitelist with the specified IP in the request
exports.delete = (req, res) => {
  const IP = req.params.IP

  IP_whitelist.destroy({
    where: { IP: IP }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'IP Whitelist was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete IP Whitelist with IP=${IP}. IP Whitelist was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete IP Whitelist with IP=' + IP
      })
    })
}

// Delete all IP Whitelist from the database.
exports.deleteAll = (req, res) => {
  IP_whitelist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} IP Whitelist were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all IP Whitelist.'
      })
    })
}

