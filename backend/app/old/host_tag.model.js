module.exports = (sequelize, Sequelize) => {
  const Host_tag = sequelize.define('host_tag', {
    tag_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true
    },
    host_id: {
      type: Sequelize.INTEGER(11)
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Host_tag
}
