const db = require("../models");
const Host = db.host;
const Op = db.Sequelize.Op;

// Create and Save a new Host
exports.create = (req, res) => {
    // Validate request
    if (!req.body.MAC) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const host = {
        MAC: req.body.MAC,
        IP: req.body.IP,
        port: req.body.port,
        protocol: req.body.protocol,
        timestamp: req.body.timestamp
    };

    // Save Host in the database
    Host.create(host)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Host."
            });
        });
};

// Retrieve all Hosts from the database.
exports.findAll = (req, res) => {
    const ip = req.query.IP;
    var condition = ip ? { ip: { [Op.like]: `%${ip}%` } } : null;

    Host.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.host_id;

    Host.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Host with id=" + id
            });
        });
};

// Update a Host by the id in the request
exports.update = (req, res) => {
    const id = req.params.host_id;

    Host.update(req.body, {
        where: { host_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Host was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Host with id=${id}. Maybe Host was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Host with id=" + id
            });
        });
};

// Delete a Host with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.host_id;

    Host.destroy({
        where: { host_id : id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Host was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Host with host_id=${id}. Maybe Host was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Host with Host_id=" + id
            });
        });
};

// Delete all Host from the database.
exports.deleteAll = (req, res) => {
    Host.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Hosts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all hosts."
            });
        });
};


