var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT || 8080;
var app = express();
const db = require('./models');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var htmlRoutes = require("./controller/html-routes.js");
var apiRoutes = require("./controller/api-routes.js");
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

db.sequelize.sync({force: false}).then(function(){
  app.listen(port, function() {
    console.log("App listening on port " + port);
  });
});
