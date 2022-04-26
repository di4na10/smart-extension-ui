module.exports = (sequelize, Sequelize) => {
  const Write_Whitelist = sequelize.define('write_whitelist', {
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

  return Write_Whitelist
}
