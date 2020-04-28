const Client = require("../../models").Clients;

module.exports = {
  create(req, res) {
    return Client.create(
      {
        name: req.body.name + " " + req.body.firstName,
        email: req.body.email,
        password: req.body.password,
        numTel: req.body.numTel,
        dateDeNaissance: Date.parse(req.body.dateDeNaissance),
      }
      // req.body)
    )
      .then((message) => res.status(201).send(message))
      .catch((error) => res.status(400).send(error));
  },
};
