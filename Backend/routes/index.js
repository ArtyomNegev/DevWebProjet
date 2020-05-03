const controllers = require("../controllers");
const messageController = controllers.message;
const clientController = controllers.client;
const jwt = require("jsonwebtoken");
const authenticateController = controllers.authenticate;
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Gilles API",
    })
  );
  app.post("/api/client", clientController.create);
  app.post("/api/message", auth, messageController.create);
  app.post("/api/authenticate", authenticateController.login);
};
