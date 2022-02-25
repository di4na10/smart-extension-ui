const db = require("../models");
const IP_blacklist = db.IP_blacklist;
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

    // Create a IP_blacklist
    const IP_blacklist = {
        IP: req.body.IP
    };

    // Save IP_blacklist in the database
    IP_blacklist.create(tag)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the IP_blacklist."
            });
        });
};

// Retrieve all IP_blacklist from the database.
exports.findAll = (req, res) => {
    const id = req.query.ip;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    IP_blacklist.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving IP_blacklist."
            });
        });
};

// Find a single IP_blacklist with a ip
exports.findOne = (req, res) => {
    const id = req.params.ip;

    IP_blacklist.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving IP_blacklist with ip=" + id
            });
        });
};

// Update a IP_blacklist by the ip in the request
exports.update = (req, res) => {
    const id = req.params.ip;

    IP_blacklist.update(req.body, {
        where: { ip: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IP_blacklist was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update IP_blacklist with ip=${id}. Maybe IP_blacklist was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating IP_blacklist with ip=" + id
            });
        });
};

// Delete a IP_blacklist with the specified ip in the request
exports.delete = (req, res) => {
    const id = req.params.ip;

    IP_blacklist.destroy({
        where: { ip : id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IP_blacklist was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete IP_blacklist with ip=${id}. IP_blacklist was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete IP_blacklist with ip=" + id
            });
        });
};

// Delete all IP_blacklist from the database.
exports.deleteAll = (req, res) => {
    IP_blacklist.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} IP_blacklist were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all IP_blacklist."
            });
        });
};


