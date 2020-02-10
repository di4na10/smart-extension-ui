module.exports = app => {
    const failsafe_tag = require("../controllers/failsafe_tag.controller.js");

    var router = require("express").Router();

    // Create a new Failsafe_Tag
    router.post("/", failsafe_tag.create);

    // Retrieve all Failsafe_Tag
    router.get("/", failsafe_tag.findAll);

    // Retrieve a single Failsafe_Tag with id
    router.get("/:tag_id", failsafe_tag.findOne);

    // Update a Failsafe_Tag with id
    router.put("/:tag_id", failsafe_tag.update);

    // Delete a Failsafe_Tag with id
    router.delete("/:tag_id", failsafe_tag.delete);

    // Delete a new Failsafe_Tag
    router.delete("/", failsafe_tag.deleteAll);

    app.use('/api/failsafe_tag', router);
};
