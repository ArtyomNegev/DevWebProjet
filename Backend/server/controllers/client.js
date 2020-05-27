const Client = require("../../models").Clients;
const Appointment = require("../../models").Appointments;
const Message = require("../../models").Messages;

const tokenLib = require("../middleware/token");


const bcrypt = require("bcrypt");
const { Op, literal } = require('sequelize');

module.exports = {
  create(req, res) {
    let hash = bcrypt.hashSync(req.body.Mdp, 10);
    return Client.create(
      {
        name:  req.body.firstName + " " + req.body.name,
        email: req.body.email,
        password: hash,
        numTel: req.body.numTel,
        dateDeNaissance: Date.parse(req.body.dateDeNaissance),
      }
      // req.body)
    )
      .then((message) => {
	    // console.log('message', message)
		message.password = "##########" 
		res.status(201).send(message)
      })
      .catch((error) => res.status(400).send(error));
  },

  getClients(req, res) {

		return Client.findAll({
			attributes: {exclude: ['password']}
		})
			//.then(call pruneFetchAll(req,res, (req.userId==0), )
			.then((msg) => res.status(200).send(msg))
			.catch((error) => res.status(400).send(error));

	},
	
	// , required:false
	// , { model: Messages , required:false} 
	
   getClient(req, res) {
		return Client.findOne({
			attributes: {exclude: ['password']},
			include: [{ model: Appointment,  as: 'appointment', required:false }, { model: Message,  as: 'message', required:false }],
			where: {
				userId: req.params.id,
				[Op.or]: [
					{ userId: req.userId },
					literal(req.userId + ' = 0'),
				]
				//}
			}
		})
			//.then(call pruneFetchAll(req,res, (req.userId==0), )
			.then((msg) => res.status(200).send(msg))
			.catch((error) => 
			    {
					console.log(error)
					res.status(400).send(error)
				});

	},
};
