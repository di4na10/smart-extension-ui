module.exports = app => {
  const write_whitelist = require('../controllers/write_whitelist.controller.js')

  const router = require('express').Router()

  // Create a new Write Writelist
  router.post('/', write_whitelist.create)

  // Retrieve all Write Writelist
  router.get('/', write_whitelist.findAll)

  // Retrieve a single Write Writelist with (ip_src, ip_dst)
  router.get('/:ip_src/:ip_dst', write_whitelist.findOne)

  // Update a Write Writelist with (ip_src, ip_dst)
  router.put('/:ip_src/:ip_dst', write_whitelist.update)

  // Delete a Write Writelist with (ip_src, ip_dst)
  router.delete('/:ip_src/:ip_dst', write_whitelist.delete)

  // Delete Write Writelist
  router.delete('/', write_whitelist.deleteAll)

  app.use('/api/write_whitelist', router)
}
