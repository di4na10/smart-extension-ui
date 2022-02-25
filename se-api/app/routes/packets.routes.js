module.exports = app => {
    const packets = require("../controllers/packets.controller.js");

    var router = require("express").Router();

    // Create a new Host
    router.post("/", packets.create);

    // Retrieve all Host
    router.get("/", packets.findAll);

    // Retrieve a single Host with id
    router.get("/:id", packets.findOne);

    // Update a Host with id
    router.put("/:id", packets.update);

    // Delete a Host with id
    router.delete("/:id", packets.delete);

    // Delete a new Tutorial
    router.delete("/", packets.deleteAll);

    app.use('/api/packets', router);
};
