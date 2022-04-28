module.exports = (sequelize, Sequelize) => {
  const Host = sequelize.define('host', {
    MAC: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    IP: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    plc_port: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    other_port: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    direction: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    protocol: {
      type: Sequelize.STRING
    },
    plc_name: {
      type: Sequelize.STRING
    },
    broadcast: {
      type: Sequelize.STRING
    },
    timestamp: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Host
}
