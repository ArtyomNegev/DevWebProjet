import { BASEURL } from "../constant/constant";
import axios from "axios";

export async function CreateClient(
  name,
  firstName,
  email,
  numTel,
  dateDeNaissance,
  Mdp
) {
  return axios.post(BASEURL + "api/client", {
    name,
    firstName,
    email,
    numTel,
    dateDeNaissance,
    Mdp,
  });
}
