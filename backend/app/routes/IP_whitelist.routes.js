module.exports = app => {
  const IP_whitelist = require('../controllers/IP_whitelist.controller.js')

  const router = require('express').Router()

  // Create a new IP Whitelist
  router.post('/', IP_whitelist.create)

  // Retrieve all IP Whitelist
  router.get('/', IP_whitelist.findAll)

  // Retrieve a single IP Whitelist with IP
  router.get('/:IP', IP_whitelist.findOne)

  // Update a IP Whitelist with IP
  router.put('/:IP', IP_whitelist.update)

  // Delete a IP Whitelist with IP
  router.delete('/:IP', IP_whitelist.delete)

  // Delete a new IP Whitelist
  router.delete('/', IP_whitelist.deleteAll)

  app.use('/api/IP_whitelist', router)
}
