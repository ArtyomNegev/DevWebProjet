var express = require("express");
var app = express(); // here I use the express() method, instead of the createServer()
const bodyParser = require("body-parser");
var createError = require("http-errors");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var models = require("./models");

models.sequelize
  .sync()
  .then(function() {
    console.log("nice DB OK");
  })
  .catch(function(err) {
    console.log(err, "Db not ok");
  });
require("./server/routes")(app);

app.get("/", function(req, res) {
  res.send("Hello World");
});
module.exports = app;

var server = app.listen(8000, function() {
  console.log("Listening on port %d", server.address().port);
});
