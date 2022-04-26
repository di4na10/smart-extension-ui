module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define('tag', {
    tag_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    plc_name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    val: {
      type: Sequelize.DOUBLE
    },
    type: {
      type: Sequelize.STRING
    },
    protocol: {
      type: Sequelize.STRING
    },
    timestamp: {
      type: Sequelize.STRING
    },
    min: {
      type: Sequelize.DOUBLE
    },
    max: {
      type: Sequelize.DOUBLE
    },
    range_min: {
      type: Sequelize.DOUBLE
    },
    range_max: {
      type: Sequelize.DOUBLE
    },
    active: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    index_offset: {
      type: Sequelize.STRING
    },
    handle: {
      type: Sequelize.INTEGER
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Tag
}
