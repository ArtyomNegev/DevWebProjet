import { BASEURL } from "../constant/constant";
import axios from "axios";

export async function CreateMessageAndClient(
  name,
  firstName,
  email,
  numTel,
  dateDeNaissance,
  sujet,
  contenu
) {
  return axios.post(BASEURL + "api/client", {
    name,
    firstName,
    email,
    numTel,
    dateDeNaissance,
    sujet,
    contenu
  });
}
