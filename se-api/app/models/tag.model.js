module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
            tag_id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true
            },
            ref: {
                type: Sequelize.INTEGER(11)
            },
            name: {
                type: Sequelize.STRING
            },
            val: {
                type: Sequelize.DOUBLE
            },
            type: {
                type: Sequelize.STRING
            },
            protocol: {
                type: Sequelize.STRING
            },
            timestamp: {
                type: Sequelize.DOUBLE
            },
            min: {
                type: Sequelize.DOUBLE
            },
            max: {
                type: Sequelize.DOUBLE
            },
            range_min: {
                type: Sequelize.DOUBLE
            },
            range_max: {
                type: Sequelize.DOUBLE
            },
            direction: {
                type: Sequelize.STRING
            }
        },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        });

    return Tag;
};
