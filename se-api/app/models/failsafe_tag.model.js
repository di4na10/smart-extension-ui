module.exports = (sequelize, Sequelize) => {
    const Failsafe_tag = sequelize.define("failsafe_tag", {
            tag_id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true
            },
            val: {
                type: Sequelize.INTEGER(11)
            }
        },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        });

    return Failsafe_tag;
};
