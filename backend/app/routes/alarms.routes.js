module.exports = app => {
  const alarms = require('../controllers/alarms.controller.js')

  const router = require('express').Router()

  // Create a new Alarm
  router.post('/', alarms.create)

  // Retrieve all Alarm
  router.get('/', alarms.findAll)

  // Retrieve a single Alarm with index
  router.get('/:id', alarms.findOne)

  // Update a Alarm with index
  router.put('/:id', alarms.update)

  // Delete a Alarm with index
  router.delete('/:id', alarms.delete)

  // Delete a new Alarm
  router.delete('/', alarms.deleteAll)

  app.use('/api/alarms', router)
}
