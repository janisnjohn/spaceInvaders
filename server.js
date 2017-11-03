var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT || 8080;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var htmlRoutes = require("./controller/html-routes.js");
var apiRoutes = require("./controller/api-routes.js");
app.use("/", htmlRoutes);
app.use("/api/", apiRoutes);

app.listen(port, function() {
  console.log("App listening on port " + port);
});

