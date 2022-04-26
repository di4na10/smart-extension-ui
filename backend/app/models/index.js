const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },

  define: {
    freezeTableName: true
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.alarms = require('./alarms.model.js')(sequelize, Sequelize)
db.host = require('./host.model.js')(sequelize, Sequelize)
db.packets = require('./packets.model.js')(sequelize, Sequelize)
db.tag = require('./tag.model.js')(sequelize, Sequelize)
db.parameters = require('./parameters.model.js')(sequelize, Sequelize)
db.IP_whitelist = require('./IP_whitelist.model.js')(sequelize, Sequelize)
db.IP_blacklist = require('./IP_blacklist.model.js')(sequelize, Sequelize)
db.Notify_Whitelist = require('./notify_whitelist.model.js')(sequelize, Sequelize)
db.Read_Whitelist = require('./read_whitelist.model.js')(sequelize, Sequelize)
db.Write_Whitelist = require('./write_whitelist.model.js')(sequelize, Sequelize)
db.Net_Conf = require('./net_conf.model.js')(sequelize, Sequelize)
db.Routes = require('./routes.model.js')(sequelize, Sequelize)
db.SCADA_Systems = require('./scada_systems.model.js')(sequelize, Sequelize)
db.PLC_Systems = require('./plc_systems.model.js')(sequelize, Sequelize)
db.PLC_Packets = require('./plc_packets.model.js')(sequelize, Sequelize)

/*
db.PID = require('./pid.model.js')(sequelize, Sequelize)
 */

module.exports = db
