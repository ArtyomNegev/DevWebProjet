const Client = require("../../models").Clients;
const Message = require("../../models").Message;
module.exports = {
  create(req, res) {
    return Client.create(
      {
        name: req.body.name + " " + req.body.firstName,
        email: req.body.email,
        numTel: req.body.numTel,
        dateDeNaissance: Date.parse(req.body.dateDeNaissance)
      }
      // req.body)
    )
      .then(client => {
        return Message.create({
          sujet: req.body.sujet,
          contenu: req.body.contenu,
          dateEnvoi: Date.now(),
          clientId: client.userId
        })
          .then(message => res.status(201).send(message))
          .catch(error => res.status(400).send(error));
      })

      .catch(error => res.status(400).send(error));
  }
};
