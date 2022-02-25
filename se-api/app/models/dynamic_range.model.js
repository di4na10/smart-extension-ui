module.exports = (sequelize, Sequelize) => {
    const Dynamic_range = sequelize.define("dynamic_range", {
            tag_id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true
            },
            state: {
                type: Sequelize.INTEGER(11)
            },
            range_min: {
                type: Sequelize.DOUBLE
            },
            range_max: {
                type: Sequelize.DOUBLE
            }
        },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        });

    return Dynamic_range;
};
