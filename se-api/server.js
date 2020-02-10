const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    // please add the ip addresses of ui to allows
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/host.routes")(app);
require("./app/routes/alarms.routes")(app);
require("./app/routes/packets.routes")(app);
require("./app/routes/tag.routes")(app);
require("./app/routes/dynamic_range.routes")(app);
require("./app/routes/failsafe_tag.routes")(app);
require("./app/routes/host_tag.routes")(app);
require("./app/routes/IP_blacklist.routes")(app);
require("./app/routes/IP_whitelist.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
