var express = require("express");
const passport = require("passport");

var app = express(); // here I use the express() method, instead of the createServer()
const bodyParser = require("body-parser");
var createError = require("http-errors");
var cors = require("cors");
const expressOasGenerator = require("express-oas-generator");
expressOasGenerator.init(app, {});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
var models = require("./models");
/*
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));*/
models.sequelize
  .sync()
  .then(function () {
    console.log("nice DB OK");
  })
  .catch(function (err) {
    console.log(err, "Db not ok");
  });
require("./server/routes")(app);
/*const routes = require("./server/routes");

app.use("/", routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use("/user", passport.authenticate("jwt", { session: false }), routes);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});*/

app.get("/", function (req, res) {
  res.send("Hello World");
});
module.exports = app;

var server = app.listen(8000, function () {
  console.log("Listening on port %d", server.address().port);
});
