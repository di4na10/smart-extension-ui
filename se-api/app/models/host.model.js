module.exports = (sequelize, Sequelize) => {
    const Host = sequelize.define("host", {
        host_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        MAC: {
            type: Sequelize.STRING
        },
        IP: {
            type: Sequelize.STRING
        },
        port: {
            type: Sequelize.STRING
        },
        protocol: {
            type: Sequelize.STRING
        },
        timestamp: {
            type: Sequelize.DOUBLE
        }
    },
    {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    });

    return Host;
};
