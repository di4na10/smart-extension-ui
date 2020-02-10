module.exports = app => {
    const IP_whitelist = require("../controllers/IP_whitelist.controller.js");

    var router = require("express").Router();

    // Create a new tag
    router.post("/", IP_whitelist.create);

    // Retrieve all tag
    router.get("/", IP_whitelist.findAll);

    // Retrieve a single tag with ip
    router.get("/:ip", IP_whitelist.findOne);

    // Update a tag with ip
    router.put("/:ip", IP_whitelist.update);

    // Delete a tag with ip
    router.delete("/:ip", IP_whitelist.delete);

    // Delete a new tag
    router.delete("/", IP_whitelist.deleteAll);

    app.use('/api/IP_whitelist', router);
};
