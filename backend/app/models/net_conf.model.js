module.exports = (sequelize, Sequelize) => {
  const Net_Conf = sequelize.define('net_conf', {
    parameter: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    value: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Net_Conf
}
