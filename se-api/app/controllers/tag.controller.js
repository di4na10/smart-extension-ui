const db = require("../models");
const Tag = db.tag;
const Op = db.Sequelize.Op;

// Create and Save a new Tag
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tag_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tag
    const tag = {
        tag_id: req.body.tag_id,
        ref: req.body.ref,
        name: req.body.name,
        val: req.body.val,
        type: req.body.type,
        protocol: req.body.protocol,
        timestamp: req.body.timestamp,
        min: req.body.min,
        max: req.body.max,
        range_min: req.body.range_min,
        range_max: req.body.range_max,
        direction: req.body.direction
    };

    // Save Host_tag in the database
    Tag.create(tag)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tag."
            });
        });
};

// Retrieve all Tag from the database.
exports.findAll = (req, res) => {
    const id = req.query.tag_id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Tag.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tag."
            });
        });
};

// Find a single Tag with a tag_id
exports.findOne = (req, res) => {
    const id = req.params.tag_id;

    Tag.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tag with tag_id=" + id
            });
        });
};

// Update a Tag by the id in the request
exports.update = (req, res) => {
    const id = req.params.tag_id;

    Tag.update(req.body, {
        where: { tag_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tag was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tag with tag_id=${id}. Maybe Tag was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tag with tag_id=" + id
            });
        });
};

// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.tag_id;

    Tag.destroy({
        where: { tag_id : id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tag was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tag with tag_id=${id}. Tag was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tag with tag_id=" + id
            });
        });
};

// Delete all Tag from the database.
exports.deleteAll = (req, res) => {
    Tag.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tag were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tag."
            });
        });
};


