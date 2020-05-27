//const Message = require("../../models").Messages;
//var abs = require( 'math-abs' );

module.exports = {
  getMondays(req, res) {
	
	const NB_SEC_IN_1DAY = 86400;
	const NB_MILLISEC_IN_1DAY = NB_SEC_IN_1DAY * 1000
	const NB_MILLISEC_IN_1WEEK = NB_MILLISEC_IN_1DAY *7
	
	var pastW = parseInt(req.query.pastW) 
	var nextW = parseInt(req.query.nextW)
	
	//console.log("pastW",pastW)
	//console.log("nextW",nextW)
	
	var fetchMondayCurrWeekMS = Date.now()
	while (new Date(fetchMondayCurrWeekMS).getDay()!=1)
	{
		fetchMondayCurrWeekMS-= NB_MILLISEC_IN_1DAY		
	}
	//console.log(new Date(fetchMondayCurrWeekMS).toISOString().split('T')[0])
	var resp = { currentMonday : new Date(fetchMondayCurrWeekMS).toISOString().split('T')[0] }
		
	var nbWeeks = nextW+1+pastW
	//console.log("nbWeeks",nbWeeks)
	
	var outputDates = []
	
	var iterOnAllWeeks = fetchMondayCurrWeekMS
	for(let i = 0; i < pastW; i++){ 
		iterOnAllWeeks -= NB_MILLISEC_IN_1WEEK
	}
	
	for(let i = 0; i < nbWeeks; i++){ 
		outputDates.push( new Date(iterOnAllWeeks).toISOString().split('T')[0])
		iterOnAllWeeks += NB_MILLISEC_IN_1WEEK
		//console.log(outputDates[i])
	}	
	
	//console.log(outputDates)

	resp.mondays = outputDates


	res.setHeader('Content-Type', 'application/json');
//	res.status(200).send('["2020-04-27","2020-05-04", "2020-05-11", "2020-05-18", "2020-05-25"]')
	res.status(200).send(JSON.stringify(resp))

    return ; 


/*	Message.create({
      sujet: req.body.sujet,
      contenu: req.body.contenu,
      dateEnvoi: Date.now(),
      clientId: req.userId,
    })
      .then((msg) => res.status(201).send(msg))
      .catch((error) => res.status(400).send(error));
*/
  },
};
