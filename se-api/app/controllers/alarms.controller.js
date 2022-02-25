const db = require("../models");
const Alarms = db.alarms;
const Op = db.Sequelize.Op;

// Create and Save a new Alarms
exports.create = (req, res) => {
    // Validate request
    if (!req.body.index) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const alarm = {
        index: req.body.index,
        level: req.body.level,
        name: req.body.name,
        description: req.body.description,
        timestamp: req.body.timestamp
    };

    // Save Alarms in the database
    Alarms.create(alarm)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Alarms."
            });
        });
};

// Retrieve all Alarms from the database.
exports.findAll = (req, res) => {
    const id = req.query.index;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Alarms.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Alarms."
            });
        });
};

// Find a single Alarm with an id
exports.findOne = (req, res) => {
    const id = req.params.index;

    Alarms.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Alarms with id=" + id
            });
        });
};

// Update a Alarm by the id in the request
exports.update = (req, res) => {
    const id = req.params.index;

    Alarms.update(req.body, {
        where: { index: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Alarm was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Alarm with index=${id}. Maybe Alarm was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Alarm with index=" + id
            });
        });
};

// Delete a Alarm with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.index;

    Alarms.destroy({
        where: { index : id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Alarm was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Alarm with index=${id}. Alarms was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Alarms with index=" + id
            });
        });
};

// Delete all Alarm from the database.
exports.deleteAll = (req, res) => {
    Alarms.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Alarms were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all alarms."
            });
        });
};


