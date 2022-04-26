module.exports = (sequelize, Sequelize) => {
  const Routes = sequelize.define('routes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    host_name: {
      type: Sequelize.STRING
    },
    ip_address: {
      type: Sequelize.STRING
    },
    MAC: {
      type: Sequelize.STRING
    },
    ams_netid: {
      type: Sequelize.STRING
    },
    TwinCAT: {
      type: Sequelize.STRING
    },
    OS_version: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    whitelist: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Routes
}
