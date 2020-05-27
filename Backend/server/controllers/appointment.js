const Appointment = require("../../models").Appointments;
const Clients = require("../../models").Clients;
const { QueryTypes, sequelize, Op, literal } = require('sequelize');


module.exports = {
	create(req, res) {

		//  "2014-01-01T23:28:56.782Z"
		var debutTS = req.body.debut;
		var debutDate = debutTS.substring(0, 10);
		var debutHeure = debutTS.substring(11, 16);


		return Appointment.create({
			debut: req.body.debut,
			fin: req.body.fin,
			date: debutDate,
			heureDebut: debutHeure,
			commentaire: req.body.commentaire,
			clientId: req.userId,
			createdAt: Date.now(),
			updatedAt: Date.now()
		})
			.then((msg) => res.status(201).send(msg))
			.catch((error) => res.status(400).send(error));
	},


	update(req, res) {
		return Appointment.update(req.body, {
			where: {
				id: req.params.id,
				[Op.or]: [
					{ clientId: req.userId },
					literal(req.userId + ' = 0'),
				]
			}
		})
			.then((msg) => res.status(200).json({ "sql.impactedRows": msg }))
			.catch((error) => res.status(400).send(error));
	},


	delete(req, res) {
		return Appointment.destroy({
			where: {
				id: req.params.id,
				[Op.or]: [
					{ clientId: req.userId },
					literal(req.userId + ' = 0'),
				]
			}
		})
			.then((msg) => res.status(200).json({ "sql.impactedRows": msg }))
			.catch((error) => res.status(400).send(error));
	},

	getCollection(req, res) {
		// return week by week
		// expect a date

		let month = 86400 * 30 * 1000;

		var fromDate = req.query.fromDate;
		if (fromDate === undefined) {
			fromDate = new Date(Date.now()-month).toISOString().split('T')[0]
		}
		var toDate = req.query.toDate;
		if (toDate === undefined) {
			toDate = new Date(Date.now()+month).toISOString().split('T')[0]
		}
		//console.log('fromDate',fromDate)
		//console.log('toDate',toDate)

		return Appointment.findAll({
			//   join only with field  userId  to have similar structure as moderator.appointments
			//include: { model: Clients, attributes: ['userId'] },
			
			where: {
				/*
				  default and  for  where   --  [Op.and]:
				{*/
				debut: {
					[Op.and]:
					{
						[Op.gte]: literal('STR_TO_DATE("' + fromDate + '","%Y-%m-%d")'),
						[Op.lte]: literal('STR_TO_DATE("' + toDate + '","%Y-%m-%d")')
					}

				},
				
/*				[Op.or]: [
					{ clientId: req.userId },
					literal(req.userId + ' = 0'),
				]
*/				//}
			},
			order: literal('1 DESC')
		})
			.then
			((msg) => 
				{
					// console.log(msg)
					let anonymAppointments = msg.map(e => {
				      return {
					    id: e.dataValues.id,
				        debut: e.dataValues.debut,
						fin : e.dataValues.fin,
			            commentaire : (req.userId===e.dataValues.clientId?e.dataValues.commentaire:""),
				        createdAt : e.dataValues.createdAt,
						updatedAt : e.dataValues.updatedAt,
						clientId : (req.userId===e.dataValues.clientId?e.dataValues.clientId:-1),
				      };
				    });
					
					// console.log(anonymAppointments)
					//res.status(200).send(msg)
				    res.status(200).send(anonymAppointments)
				}
			)
			.catch((error) => res.status(400).send(error));
	},


	getModeratorCollection(req, res) {
		// return week by week
		// expect a date

		let month = 86400 * 30 * 1000;

		var fromDate = req.query.fromDate;
		if (fromDate === undefined) {
			fromDate = new Date(Date.now()-month).toISOString().split('T')[0]
		}
		var toDate = req.query.toDate;
		if (toDate === undefined) {
			toDate = new Date(Date.now()+month).toISOString().split('T')[0]
		}

		if (req.userId != 0) {
			res.status(401).send("No sufficient rights")
			return;
		}

		return Appointment.findAll({
			include: { model: Clients, attributes: { exclude: ['password'] } },
			where: {
				debut: {
					[Op.and]:
					{
						[Op.gte]: literal('STR_TO_DATE("' + fromDate + '","%Y-%m-%d")'),
						[Op.lte]: literal('STR_TO_DATE("' + toDate + '","%Y-%m-%d")')
					}

				},
/*
				debut: {
					[Op.and]:
					{
						[Op.gt]: literal('STR_TO_DATE(\"' + req.query.fromDate + '\","%Y-%m-%d")'),
						[Op.lt]: literal('DATE_ADD("' + req.query.fromDate + '", INTERVAL 07 DAY)')
					}
				},
				
*/				
				[Op.or]: [
					{ clientId: req.userId },
					// test  if   req.userId = 0
					//  ["id > ?", 25]
					// ["clientId = ?" , req.userId]
					literal(req.userId + ' = 0'),
				]
				//}
			},
			order: literal('1 ASC')
		})
			//.then(call pruneFetchAll(req,res, (req.userId==0), )
			.then((msg) => res.status(200).send(msg))
			.catch((error) => res.status(400).send(error));

	},


	getAppointmentByClientAndId(req, res) {

		return Appointment.findOne({
			// include: { model: Clients, attributes: { exclude: ['password'] } },
			where: {
				id: req.params.id,
				[Op.or]: [
					{ clientId: req.userId },
					literal(req.userId + ' = 0'),
				]
				//}
			}
		})
			//.then(call pruneFetchAll(req,res, (req.userId==0), )
			.then((msg) => res.status(200).send(msg))
			.catch((error) => res.status(400).send(error));

	},


	getAppointmentsByClient(req, res) {

		return Appointment.findAll({
			// include: { model: Clients, attributes: { exclude: ['password'] } },
			where: {
				[Op.or]: [
					{ clientId: req.userId },
					literal(req.userId + ' = 0'),
				]
				//}
			},
			order : literal ('debut')
			// order: literal('abs(debut-now()) ASC') 
		})
			//.then(call pruneFetchAll(req,res, (req.userId==0), )
			.then((msg) => res.status(200).send(msg))
			.catch((error) => res.status(400).send(error));

	}





};

