module.exports = app => {
    const alarms = require("../controllers/alarms.controller.js");

    var router = require("express").Router();

    // Create a new Alarm
    router.post("/", alarms.create);

    // Retrieve all Alarm
    router.get("/", alarms.findAll);

    // Retrieve a single Alarm with index
    router.get("/:index", alarms.findOne);

    // Update a Alarm with index
    router.put("/:index", alarms.update);

    // Delete a Alarm with index
    router.delete("/:index", alarms.delete);

    // Delete a new Alarm
    router.delete("/", alarms.deleteAll);

    app.use('/api/alarms', router);
};
