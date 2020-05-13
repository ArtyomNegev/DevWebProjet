import { BASEURL } from "../constant/constant";
import axios from "axios";

export async function Authenticate(email, Mdp) {
  return axios
    .post(BASEURL + "api/authenticate", {
      email,
      Mdp,
    })
    .then(
      (response) => {
        console.log(response);
        localStorage.setItem("JWTtoken", response.data.token);
        localStorage.setItem("moderator", response.data.moderator);
        console.log("put in localStorage");
        console.log(localStorage.getItem("JWTtoken"));
      }
      // , (error) => {
      // 	console.log(error);
      // }
    );
}
