const db = require("../models");
const IP_whitelist = db.IP_whitelist;
const Op = db.Sequelize.Op;

// Create and Save a new Tag
exports.create = (req, res) => {
    // Validate request
    if (!req.body.IP) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a IP_whitelist
    const IP_whitelist = {
        IP: req.body.IP
    };

    // Save IP_whitelist in the database
    IP_whitelist.create(tag)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the IP_whitelist."
            });
        });
};

// Retrieve all IP_whitelist from the database.
exports.findAll = (req, res) => {
    const id = req.query.ip;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    IP_whitelist.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving IP_whitelist."
            });
        });
};

// Find a single IP_whitelist with a ip
exports.findOne = (req, res) => {
    const id = req.params.ip;

    IP_whitelist.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving IP_whitelist with ip=" + id
            });
        });
};

// Update a IP_whitelist by the ip in the request
exports.update = (req, res) => {
    const id = req.params.ip;

    IP_whitelist.update(req.body, {
        where: { ip: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IP_whitelist was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update IP_whitelist with ip=${id}. Maybe IP_whitelist was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating IP_whitelist with ip=" + id
            });
        });
};

// Delete a IP_whitelist with the specified ip in the request
exports.delete = (req, res) => {
    const id = req.params.ip;

    IP_whitelist.destroy({
        where: { ip : id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IP_whitelist was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete IP_whitelist with ip=${id}. IP_whitelist was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete IP_whitelist with ip=" + id
            });
        });
};

// Delete all IP_whitelist from the database.
exports.deleteAll = (req, res) => {
    IP_whitelist.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} IP_whitelist were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all IP_whitelist."
            });
        });
};


