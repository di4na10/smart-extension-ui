const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
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
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.host = require("./host.model.js")(sequelize, Sequelize);
db.alarms = require("./alarms.model.js")(sequelize, Sequelize);
db.packets = require("./packets.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);
db.dynamic_range = require("./dynamic_range.model.js")(sequelize, Sequelize);
db.failsafe_tag = require("./failsafe_tag.model.js")(sequelize, Sequelize);
db.host_tag = require("./host_tag.model.js")(sequelize, Sequelize);
db.IP_blacklist = require("./IP_blacklist.model.js")(sequelize, Sequelize);
db.IP_whitelist = require("./IP_whitelist.model.js")(sequelize, Sequelize);

module.exports = db;
