module.exports = (sequelize, Sequelize) => {
  const PLC_Systems = sequelize.define('plc_systems', {
    plc_name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    ip: {
      type: Sequelize.STRING
    },
    mac: {
      type: Sequelize.STRING
    },
    PLC_AMS_ID: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return PLC_Systems
}
