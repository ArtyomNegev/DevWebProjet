import { BASEURL } from "../constant/constant";
import axios from "axios";

export async function GetClientAppointments() {
	return axios.get(BASEURL + "api/client/appointments", {
		headers: {
			'Authorization': localStorage.getItem('JWTtoken')
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
