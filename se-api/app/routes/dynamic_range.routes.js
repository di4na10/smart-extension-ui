module.exports = app => {
    const dynamic_range = require("../controllers/dynamic_range.controller.js");

    var router = require("express").Router();

    // Create a new Dynamic_Range
    router.post("/", dynamic_range.create);

    // Retrieve all Dynamic_Range
    router.get("/", dynamic_range.findAll);

    // Retrieve a single Dynamic_Range with tag_id
    router.get("/:tag_id", dynamic_range.findOne);

    // Update a Dynamic_Range with tag_id
    router.put("/:tag_id", dynamic_range.update);

    // Delete a Dynamic_Range with id
    router.delete("/:tag_id", dynamic_range.delete);

    // Delete a new Dynamic_Range
    router.delete("/", dynamic_range.deleteAll);

    app.use('/api/dynamic_range', router);
};
