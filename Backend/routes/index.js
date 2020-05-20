const controllers = require("../controllers");
const messageController = controllers.message;
const clientController = controllers.client;
const appointmentController = controllers.appointment;
const calendarController = controllers.calendar;

const jwt = require("jsonwebtoken");
const authenticateController = controllers.authenticate;
const authModule = require("../middleware/auth");
const auth = authModule.auth;
const auth0 = authModule.auth0;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Gilles API",
    })
  );
  app.post("/api/client", clientController.create);
  
  app.post("/api/authenticate", authenticateController.login);

  app.post("/api/message", auth, messageController.create);
  app.get("/api/client/messages", auth, messageController.getMessagesByClient);

  app.post("/api/appointment", auth, appointmentController.create);

  
  app.get("/api/client/appointment/:id", auth, appointmentController.getAppointmentByClientAndId);
  app.get("/api/client/appointments", auth, appointmentController.getAppointmentsByClient);
  app.put("/api/appointments/:id", auth, appointmentController.update);
  app.delete("/api/appointments/:id", auth, appointmentController.delete);

  app.get("/api/calendar/appointments", auth, appointmentController.getCollection);
  app.get("/api/moderator/calendar/appointments", auth0, appointmentController.getModeratorCollection);

  app.get("/api/calendar/mondays", calendarController.getMondays);
};
