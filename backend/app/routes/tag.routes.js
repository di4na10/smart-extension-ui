module.exports = app => {
  const tag = require('../controllers/tag.controller.js')

  const router = require('express').Router()

  // Create a new tag
  router.post('/', tag.create)

  // Retrieve all tag
  router.get('/', tag.findAll)

  // Retrieve a single tag with (name, plc_name)
  router.get('/:name/:plc_name', tag.findOne)

  // Update a tag with (name, plc_name)
  router.put('/:name/:plc_name', tag.update)

  // Delete a tag with (name, plc_name)
  router.delete('/:name/:plc_name', tag.delete)

  // Delete a new tag
  router.delete('/', tag.deleteAll)

  app.use('/api/tag', router)
}
