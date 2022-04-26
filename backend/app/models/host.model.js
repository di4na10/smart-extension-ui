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
    port: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    protocol: {
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
