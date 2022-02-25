module.exports = (sequelize, Sequelize) => {
    const IP_whitelist = sequelize.define("IP_whitelist", {
            ip: {
                type: Sequelize.INTEGER(11),
                primaryKey: true
            }
        },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        });

    return IP_whitelist;
};
