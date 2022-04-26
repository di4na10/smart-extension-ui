module.exports = app => {
  const read_whitelist = require('../controllers/read_whitelist.controller.js')

  const router = require('express').Router()

  // Create a new Read Writelist
  router.post('/', read_whitelist.create)

  // Retrieve all Read Writelist
  router.get('/', read_whitelist.findAll)

  // Retrieve a single Read Writelist with (ip_src, ip_dst)
  router.get('/:ip_src/:ip_dst', read_whitelist.findOne)

  // Update a Read Writelist with (ip_src, ip_dst)
  router.put('/:ip_src/:ip_dst', read_whitelist.update)

  // Delete a Read Writelist with (ip_src, ip_dst)
  router.delete('/:ip_src/:ip_dst', read_whitelist.delete)

  // Delete Read Writelist
  router.delete('/', read_whitelist.deleteAll)

  app.use('/api/read_whitelist', router)
}
