module.exports = (sequelize, Sequelize) => {
  const Notify_Whitelist = sequelize.define('notify_whitelist', {
    ip_src: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    ip_dst: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    active: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Notify_Whitelist
}
