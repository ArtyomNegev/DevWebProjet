import getBaseURL from "./common-http-calls"
import axios from "axios";

export async function CreateMessage(sujet, contenu) {
	return axios.post(getBaseURL() + "api/message",
		{
			sujet,
			contenu,
		},

		{
			headers: {
				'Authorization': localStorage.getItem('JWTtoken')
			}
		});
}


export async function GetClientMessages() {
	return axios.get(getBaseURL() + "api/client/messages",
		{
			headers: {
				'Authorization': localStorage.getItem('JWTtoken')
			}
		});
}

