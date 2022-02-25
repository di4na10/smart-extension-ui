module.exports = app => {
    const host = require("../controllers/host.controller.js");

    var router = require("express").Router();

    // Create a new Host
    router.post("/", host.create);

    // Retrieve all Host
    router.get("/", host.findAll);

    // Retrieve a single Host with id
    router.get("/:host_id", host.findOne);

    // Update a Host with id
    router.put("/:host_id", host.update);

    // Delete a Host with id
    router.delete("/:host_id", host.delete);

    // Delete a new Host
    router.delete("/", host.deleteAll);

    app.use('/api/host', router);
};
