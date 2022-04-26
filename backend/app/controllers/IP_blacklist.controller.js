const db = require('../models')
const IP_blacklist = db.IP_blacklist
const Op = db.Sequelize.Op

// Create and Save a new IP Blacklist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.IP) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a IP Blacklist
  const ip_blacklist = {
    IP: req.body.IP
  }

  // Save IP Blacklist in the database
  IP_blacklist.create(ip_blacklist)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the IP Blacklist.'
      })
    })
}

// Retrieve all IP Blacklist from the database.
exports.findAll = (req, res) => {
  const IP = req.query.IP
  const condition = IP ? { IP: { [Op.like]: `%${IP}%` }} : null

  IP_blacklist.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving IP Blacklist.'
      })
    })
}

// Find a single IP Blacklist with a IP
exports.findOne = (req, res) => {
  const IP = req.params.IP

  IP_blacklist.findByPk(IP)
    .then(data => {
      res.send(data)
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving IP Blacklist with IP=' + IP
      })
    })
}

// Update a IP Blacklist by the IP in the request
exports.update = (req, res) => {
  const IP = req.params.IP

  IP_blacklist.update(req.body, {
    where: { IP: IP }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'IP Blacklist was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update IP Blacklist with IP=${IP}. Maybe IP Blacklist was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating IP Blacklist with IP=' + IP
      })
    })
}

// Delete a IP Blacklist with the specified IP in the request
exports.delete = (req, res) => {
  const IP = req.params.IP

  IP_blacklist.destroy({
    where: { IP: IP }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'IP Blacklist was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete IP Blacklist with IP=${IP}. IP Blacklist was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete IP Blacklist with IP=' + IP
      })
    })
}

// Delete all IP Blacklist from the database.
exports.deleteAll = (req, res) => {
  IP_blacklist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} IP Blacklist were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all IP Blacklist.'
      })
    })
}

