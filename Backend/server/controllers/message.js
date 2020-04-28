const Message = require("../../models").Messages;

module.exports = {
  create(req, res) {
    return Message.create({
      sujet: req.body.sujet,
      contenu: req.body.contenu,
      dateEnvoi: Date.now(),
      clientId: req.body.clientId,
    })
      .then((msg) => res.status(201).send(msg))
      .catch((error) => res.status(400).send(error));
  },
};
