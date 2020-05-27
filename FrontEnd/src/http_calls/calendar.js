import getBaseURL from "./common-http-calls"

const axios = require("axios");

export const getCalendar = () => 
 
	// "/client/appointments"
	// "/calendar/appointments"

	axios.get(getBaseURL() + 'api/'+ (localStorage.getItem('moderator')==='true'?'moderator/':'') + "calendar/appointments", {
		headers: {
			'Authorization': localStorage.getItem('JWTtoken') //TOKEN
		}
	})
	.then((response) => {
//		console.log(response.data);

		let isMod = localStorage.getItem('moderator')==='true'

	    let evs = response.data.map(a => {
	      return {
		    id: a.id,
	        appointment: a,
            title : isMod?a.Client.name+' : '+a.commentaire:a.commentaire,
	        start: new Date(a.debut),
	        end: new Date(a.fin),
            client : isMod?a.Client:null
	      };
	    });

		response.data = evs;
		return response;
	})
	;



export const addCalendar = data => axios.post(getBaseURL() + "api/appointment",
		{
			debut: data.start,
			fin: data.end,
			commentaire : data.title
		},

		{
			headers: {
				'Authorization': localStorage.getItem('JWTtoken')
			}
		});

export const editCalendar = data => axios.put(getBaseURL()+'api/appointments/'+data.id,
		{
			commentaire : data.title
		},

		{
			headers: {
				'Authorization': localStorage.getItem('JWTtoken')
			}
		});



//	axios.put(`${APIURL}/calendar/${data.id}`, data);

export const deleteCalendar = id => axios.delete(`${getBaseURL()}api/appointments/${id}`,{
			headers: {
				'Authorization': localStorage.getItem('JWTtoken')
			}
		});

/* start with
   json-server -p 4000 --watch db.json
*/