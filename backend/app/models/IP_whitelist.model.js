module.exports = (sequelize, Sequelize) => {
  const IP_whitelist = sequelize.define('IP_whitelist', {
    IP: {
      type: Sequelize.STRING,
      primaryKey: true
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return IP_whitelist
}
