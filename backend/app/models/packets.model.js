module.exports = (sequelize, Sequelize) => {
  const Packets = sequelize.define('packets', {
    id: {
      type: Sequelize.INTEGER,
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
    payload: {
      type: Sequelize.TEXT
    },
    time: {
      type: Sequelize.STRING
    },
    flag: {
      type: Sequelize.INTEGER
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Packets
}
