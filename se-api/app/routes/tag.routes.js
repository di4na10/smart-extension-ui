module.exports = app => {
    const tag = require("../controllers/tag.controller.js");

    var router = require("express").Router();

    // Create a new tag
    router.post("/", tag.create);

    // Retrieve all tag
    router.get("/", tag.findAll);

    // Retrieve a single tag with tag_id
    router.get("/:tag_id", tag.findOne);

    // Update a tag with tag_id
    router.put("/:tag_id", tag.update);

    // Delete a tag with tag_id
    router.delete("/:tag_id", tag.delete);

    // Delete a new tag
    router.delete("/", tag.deleteAll);

    app.use('/api/tag', router);
};
