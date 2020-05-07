import { BASEURL } from "../constant/constant";
import axios from "axios";

export async function CreateMessage(sujet, contenu) {
  return axios.post(
    BASEURL + "api/message",
    {
      sujet,
      contenu,
    },

    {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
      },
    }
  );
}
