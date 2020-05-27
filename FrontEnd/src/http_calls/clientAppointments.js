import getBaseURL from "./common-http-calls"
import axios from "axios";

export async function GetClientAppointments() {
	return axios.get(getBaseURL() + "api/client/appointments", {
		headers: {
			'Authorization': localStorage.getItem('JWTtoken')
		}
	}).catch((error) => {
		//#TODO also check on error.data   BAD_TOKEN
		console.log('GetClientAppointments error ', error.response.status)
		
	//	alert("Vous devez vous reconnecter !") 
		if (error.response.status=== 401) {
			alert("Vous devez vous reconnecter !")
			localStorage.removeItem('JWTtoken')
		}
	})
/*	.then((response) => {
		console.log(response.data);
		console.log(response.status);
		console.log(response.statusText);
		console.log(response.headers);
		console.log(response.config);
		})
*/	
	;
}
