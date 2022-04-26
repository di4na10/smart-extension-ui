const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {
  // please add the ip addresses of ui to allows
  origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./app/models')

db.sequelize.sync()

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to smart extension application.' })
})

require('./app/routes/alarms.routes')(app)
require('./app/routes/host.routes')(app)
require('./app/routes/packets.routes')(app)
require('./app/routes/tag.routes')(app)
require('./app/routes/parameters.routes')(app)
require('./app/routes/IP_whitelist.routes')(app)
require('./app/routes/IP_blacklist.routes')(app)
require('./app/routes/notify_whitelist.routes')(app)
require('./app/routes/read_whitelist.routes')(app)
require('./app/routes/write_whitelist.routes')(app)
require('./app/routes/net_conf.routes')(app)
require('./app/routes/routes.routes')(app)
require('./app/routes/scada_systems.routes')(app)
require('./app/routes/plc_systems.routes')(app)
require('./app/routes/plc_packets.routes')(app)

/*
require('./app/routes/pid.routes')(app)
*/

// set port, listen for requests
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
