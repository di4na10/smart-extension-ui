module.exports = (sequelize, Sequelize) => {
  const IP_blacklist = sequelize.define('IP_blacklist', {
    IP: {
      type: Sequelize.STRING,
      primaryKey: true
    },
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return IP_blacklist
}
