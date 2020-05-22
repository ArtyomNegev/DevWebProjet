import { BASEURL } from "../constant/constant";

const APIURL = "http://localhost:4000";
const axios = require("axios");

export const getCalendar0 = () => axios.get(`${APIURL}/calendar`);
/*	.then((response)=> {
		console.log(response.data);
		console.log(response.status);
		console.log(response.statusText);
		console.log(response.headers);
		console.log(response.config);
		return response		
	})*/

const Gilles_BACKEND = "http://localhost:8000/api";

export const getCalendar = () =>
  axios
    .get(Gilles_BACKEND + "/client/appointments", {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"), //TOKEN
      },
    })
    .then((response) => {
      //		console.log(response.data);

      let evs = response.data.map((a) => {
        return {
          id: a.id,
          appointment: a,
          title: a.commentaire,
          start: new Date(a.debut),
          end: new Date(a.fin),
        };
      });

      response.data = evs;
      return response;
    });

export const addCalendar = (data) =>
  axios.post(
    BASEURL + "api/appointment",
    {
      debut: data.start,
      fin: data.end,
      commentaire: data.title,
    },

    {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
      },
    }
  );

export const editCalendar = (data) =>
  axios.put(
    BASEURL + "api/appointments/" + data.id,
    {
      commentaire: data.title,
    },

    {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
      },
    }
  );

//	axios.put(`${APIURL}/calendar/${data.id}`, data);

export const deleteCalendar = (id) =>
  axios.delete(`${BASEURL}api/appointments/${id}`, {
    headers: {
      Authorization: localStorage.getItem("JWTtoken"),
    },
  });

/* start with
   json-server -p 4000 --watch db.json
*/
