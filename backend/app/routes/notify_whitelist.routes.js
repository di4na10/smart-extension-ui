module.exports = app => {
  const notify_whitelist = require('../controllers/notify_whitelist.controller.js')

  const router = require('express').Router()

  // Create a new Host
  router.post('/', notify_whitelist.create)

  // Retrieve all Host
  router.get('/', notify_whitelist.findAll)

  // Retrieve a single Host with (mac, ip, port)
  router.get('/:ip_src/:ip_dst', notify_whitelist.findOne)

  // Update a Host with (mac, ip, port)
  router.put('/:ip_src/:ip_dst', notify_whitelist.update)

  // Delete a Host with (mac, ip, port)
  router.delete('/:ip_src/:ip_dst', notify_whitelist.delete)

  // Delete a new Host
  router.delete('/', notify_whitelist.deleteAll)

  app.use('/api/notify_whitelist', router)
}
