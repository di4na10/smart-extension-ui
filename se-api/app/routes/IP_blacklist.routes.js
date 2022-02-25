module.exports = app => {
    const IP_blacklist = require("../controllers/IP_blacklist.controller.js");

    var router = require("express").Router();

    // Create a new tag
    router.post("/", IP_blacklist.create);

    // Retrieve all tag
    router.get("/", IP_blacklist.findAll);

    // Retrieve a single tag with ip
    router.get("/:ip", IP_blacklist.findOne);

    // Update a tag with ip
    router.put("/:ip", IP_blacklist.update);

    // Delete a tag with ip
    router.delete("/:ip", IP_blacklist.delete);

    // Delete a new tag
    router.delete("/", IP_blacklist.deleteAll);

    app.use('/api/IP_blacklist', router);
};
