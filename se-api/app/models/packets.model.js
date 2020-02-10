module.exports = (sequelize, Sequelize) => {
    const Packets = sequelize.define("packets", {
            id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true
            },
            MAC_src: {
                type: Sequelize.STRING
            },
            MAC_dst: {
                type: Sequelize.STRING
            },
            IP_src: {
                type: Sequelize.STRING
            },
            IP_dst: {
                type: Sequelize.STRING
            },
            data: {
                type: Sequelize.TEXT('long')
            },
            time: {
                type: Sequelize.DOUBLE
            },
            flag: {
                type: Sequelize.INTEGER(11)
            }
        },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        });

    return Packets;
};
