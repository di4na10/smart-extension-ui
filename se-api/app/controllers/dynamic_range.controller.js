const db = require("../models");
const Dynamic_range = db.dynamic_range;
const Op = db.Sequelize.Op;

// Create and Save a new Dynamic_Range
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tag_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Dynamic_range
    const dynamic_range = {
        tag_id: req.body.tag_id,
        state: req.body.state,
        range_min: req.body.range_min,
        range_max: req.body.range_max
    };

    // Save Dynamic_range in the database
    Dynamic_range.create(dynamic_range)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the dynamic_range."
            });
        });
};

// Retrieve all Dynamic_range from the database.
exports.findAll = (req, res) => {
    const id = req.query.tag_id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Dynamic_range.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dynamic_range."
            });
        });
};

// Find a single Dynamic_range with a tag_id
exports.findOne = (req, res) => {
    const id = req.params.tag_id;

    Dynamic_range.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Dynamic_range with id=" + id
            });
        });
};

// Update a Dynamic_range by the tag_id in the request
exports.update = (req, res) => {
    const id = req.params.tag_id;

    Dynamic_range.update(req.body, {
        where: { tag_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dynamic_range was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update dynamic_range with tag_id=${id}. Maybe Dynamic_range was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating dynamic_range with tag_id=" + id
            });
        });
};

// Delete a Dynamic_range with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.tag_id;

    Dynamic_range.destroy({
        where: { tag_id : id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dynamic_range was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Dynamic_range with tag_id=${id}. Dynamic_range was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete dynamic_range with tag_id=" + id
            });
        });
};

// Delete all Dynamic_range from the database.
exports.deleteAll = (req, res) => {
    Dynamic_range.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} dynamic_range were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all dynamic_range."
            });
        });
};


