import getBaseURL from "./common-http-calls"
import axios from "axios";

export async function CreateClient(
	  name,
	  firstName,
	  email,
	  numTel,
	  dateDeNaissance,
	  Mdp
	) 
	{
	  return axios.post(getBaseURL() + "api/client", {
	    name,
	    firstName,
	    email,
	    numTel,
	    dateDeNaissance,
	    Mdp,
	  });
	}
	
export async function GetClients() {
	return axios.get(getBaseURL() + "api/clients",
		{
			headers: {
				'Authorization': localStorage.getItem('JWTtoken')
			}
		});
}

export async function GetClientDetails(userId) {
	return axios.get(getBaseURL() + "api/clients/"+userId,
		{
			headers: {
				'Authorization': localStorage.getItem('JWTtoken')
			}
		});
}
