module.exports = (sequelize, Sequelize) => {
  const SCADA_Systems = sequelize.define('scada_systems', {
    name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    ip: {
      type: Sequelize.STRING
    },
    mac: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return SCADA_Systems
}
