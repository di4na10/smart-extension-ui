module.exports = app => {
    const host_tag = require("../controllers/host_tag.controller.js");

    var router = require("express").Router();

    // Create a new host_tag
    router.post("/", host_tag.create);

    // Retrieve all host_tag
    router.get("/", host_tag.findAll);

    // Retrieve a single host_tag with tag_id
    router.get("/:tag_id", host_tag.findOne);

    // Update a host_tag with tag_id
    router.put("/:tag_id", host_tag.update);

    // Delete a host_tag with tag_id
    router.delete("/:tag_id", host_tag.delete);

    // Delete a new host_tag
    router.delete("/", host_tag.deleteAll);

    app.use('/api/host_tag', router);
};
