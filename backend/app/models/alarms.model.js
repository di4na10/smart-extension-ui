module.exports = (sequelize, Sequelize) => {
  const Alarms = sequelize.define('alarms', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    level: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    ip_src: {
      type: Sequelize.STRING
    },
    ip_dst: {
      type: Sequelize.STRING
    },
    description: {
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

  return Alarms
}
