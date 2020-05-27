const Message = require("../../models").Messages;
const Clients = require("../../models").Clients;

const { QueryTypes, sequelize, Op, literal } = require('sequelize');

module.exports = {
  create(req, res) {
    return Message.create({
      sujet: req.body.sujet,
      contenu: req.body.contenu,
      dateEnvoi: Date.now(),
      clientId: req.userId,
    })
      .then((msg) => res.status(201).send(msg))
      .catch((error) => res.status(400).send(error));
  },


	getMessagesByClient(req, res) {

		return Message.findAll({
			include: { model: Clients, attributes: { exclude: ['password'] } },
			where: {
				[Op.or]: [
					{ clientId: req.userId },
					literal(req.userId + ' = 0'),
				]
				//}
			},
			order : literal ('dateEnvoi DESC')
			// order: literal('abs(debut-now()) ASC') 
		})
			//.then(call pruneFetchAll(req,res, (req.userId==0), )
			.then((msg) => res.status(200).send(msg))
			.catch((error) => res.status(400).send(error));

	}
};
