module.exports = (sequelize, Sequelize) => {
  const Parameters = sequelize.define('parameters', {
    Name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    Value: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return Parameters
}
