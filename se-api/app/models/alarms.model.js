module.exports = (sequelize, Sequelize) => {
    const Alarms = sequelize.define("alarms", {
            index: {
                type: Sequelize.INTEGER(11),
                primaryKey: true
            },
            level: {
                type: Sequelize.INTEGER(11)
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            timestamp: {
                type: Sequelize.DATE
            }
        },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        });

    return Alarms;
};
