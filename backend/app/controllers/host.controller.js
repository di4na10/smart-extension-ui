const db = require('../models')
const Host = db.host
const Op = db.Sequelize.Op

// Create and Save a new Host
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.MAC) && (!req.body.IP) && (!req.body.plc_port) && (!req.body.other_port) && (!req.body.direction)) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  // Create a Host
  const host = {
    MAC: req.body.MAC,
    IP: req.body.IP,
    plc_port: req.body.port,
    other_port: req.body.other_port,
    direction: req.body.direction,
    plc_name: req.plc_name,
    broadcast: req.broadcast,
    protocol: req.body.protocol,
    timestamp: req.body.timestamp
  }

  // Save Host in the database
  Host.create(host)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the Host.'
      })
    })
}

// Retrieve all Hosts from the database.
exports.findAll = (req, res) => {
  const mac = req.query.MAC
  const condition1 = mac ? { MAC: { [Op.like]: `%${mac}%` }} : null
  const ip = req.query.IP
  const condition2 = ip ? { IP: { [Op.like]: `%${ip}%` }} : null
  const plc_port = req.query.plc_port
  const condition3 = plc_port ? { plc_port: { [Op.like]: `%${plc_port}%` }} : null
  const other_port = req.query.other_port
  const condition4 = other_port ? { other_port: { [Op.like]: `%${other_port}%` }} : null
  const direction = req.query.direction
  const condition5 = direction ? { direction: { [Op.like]: `%${direction}%` }} : null

  Host.findAll({ where: {
    [Op.and]:
      [condition1, condition2, condition3, condition4, condition5]
  }}).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while retrieving Hosts.'
      })
    })
}

// Find a single Host with an (MAC, IP, port)
exports.findOne = (req, res) => {
  const mac = req.params.mac
  const ip = req.params.ip
  const plc_port = req.params.plc_port
  const other_port = req.params.other_port
  const direction = req.params.direction

  Host.findOne({ where: {
    MAC: mac,
    IP: ip,
    plc_port: plc_port,
    other_port: other_port,
    direction: direction
  }}).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving one tutorial.'
      })
    })
}

// Update a Host by the id in the request
exports.update = (req, res) => {
  const mac = req.params.mac
  const ip = req.params.ip
  const plc_port = req.params.plc_port
  const other_port = req.params.other_port
  const direction = req.params.direction

  Host.update(req.body, {
    where: {
      MAC: mac,
      IP: ip,
      plc_port: plc_port,
      other_port: other_port,
      direction: direction
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Host was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Host with MAC=${mac}, IP=${ip}, plc_port=${plc_port} other_port=${other_port} and direction=${direction}. Maybe Host was not found or req.body is empty!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Host with MAC=${mac}, IP=${ip}, plc_port=${plc_port} other_port=${other_port} and direction=${direction}..`
      })
      res.status(404).send({
        message: `Error updating Host with MAC=${mac}, IP=${ip}, plc_port=${plc_port} other_port=${other_port} and direction=${direction}.`
      })
    })
}

// Delete a Host with the specified id in the request
exports.delete = (req, res) => {
  const mac = req.params.mac
  const ip = req.params.ip
  const plc_port = req.params.plc_port
  const other_port = req.params.other_port
  const direction = req.params.direction

  Host.destroy({
    where: {
      MAC: mac,
      IP: ip,
      plc_port: plc_port,
      other_port: other_port,
      direction: direction
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Host was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Host with MAC=${mac}, IP=${ip}, plc_port=${plc_port} other_port=${other_port} and direction=${direction}. Maybe Host was not found!`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Host with MAC=${mac}, IP=${ip}, plc_port=${plc_port} other_port=${other_port} and direction=${direction}.`
      })
    })
}

// Delete all Host from the database.
exports.deleteAll = (req, res) => {
  Host.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Hosts were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while removing all hosts.'
      })
    })
}

