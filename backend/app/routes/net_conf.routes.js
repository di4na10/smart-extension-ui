module.exports = app => {
  const net_conf = require('../controllers/net_conf.controller.js')

  const router = require('express').Router()

  // Create a new Net Conf
  router.post('/', net_conf.create)

  // Retrieve all Net Conf
  router.get('/', net_conf.findAll)

  // Retrieve a single Net Conf with parameter
  router.get('/:parameter', net_conf.findOne)

  // Update a Net Conf with parameter
  router.put('/:parameter', net_conf.update)

  // Delete a Net Conf with parameter
  router.delete('/:parameter', net_conf.delete)

  // Delete a new Net Conf
  router.delete('/', net_conf.deleteAll)

  app.use('/api/net_conf', router)
}
