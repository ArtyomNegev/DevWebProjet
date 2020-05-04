const controllers = require("../controllers");
const messageController = controllers.message;
const clientController = controllers.client;
const appointmentController = controllers.appointment;
const calendarController = controllers.calendar;

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
  
  app.post("/api/authenticate", authenticateController.login);

  app.post("/api/message", auth, messageController.create);
  app.post("/api/appointment", auth, appointmentController.create);

  app.get("/api/appointments", auth, appointmentController.getCollection);
  app.put("/api/appointments/:id", auth, appointmentController.update);
  app.delete("/api/appointments/:id", auth, appointmentController.delete);

  app.get("/api/moderator/appointments/", auth, appointmentController.getModeratorCollection);

  app.get("/api/calendar/mondays", calendarController.getMondays);
};
