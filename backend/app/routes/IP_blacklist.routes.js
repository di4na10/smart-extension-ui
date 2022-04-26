module.exports = app => {
  const IP_blacklist = require('../controllers/IP_blacklist.controller.js')

  const router = require('express').Router()

  // Create a new IP Blacklist
  router.post('/', IP_blacklist.create)

  // Retrieve all IP Blacklist
  router.get('/', IP_blacklist.findAll)

  // Retrieve a single IP Blacklist with IP
  router.get('/:IP', IP_blacklist.findOne)

  // Update a IP Blacklist with IP
  router.put('/:IP', IP_blacklist.update)

  // Delete a IP Blacklist with IP
  router.delete('/:IP', IP_blacklist.delete)

  // Delete a new IP Blacklist
  router.delete('/', IP_blacklist.deleteAll)

  app.use('/api/IP_blacklist', router)
}
