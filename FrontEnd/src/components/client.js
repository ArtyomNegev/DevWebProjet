import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import ListAppointments from "./listClientAppointments";
import ListMessages from "./listClientMessages";

import { GetClientDetails } from "../http_calls/client";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
    },
  },
}));

export default function Client(props) {
  const [loggedIn] = React.useState(localStorage.getItem("JWTtoken") != null);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [numTel, setNumTel] = React.useState("");
  const [dateNaissance, setDateNaissance] = React.useState("");

  const [recordedAppointments, setRecordedAppointments] = React.useState([]);
  const [recordedMessages, setRecordedMessages] = React.useState([]);

  //  const classes = useStyles();

  const getDataIfLoggedIn = () => {
    //console.log('getDataIfLoggedIn', 'props',props)

    const {
      match: { params },
    } = props;
    const userId = params.userId;
    //console.log('userId', userId)

    if (loggedIn) {
      //  and  check validity  (by  some  http calls ?)
      retrieveClientData(userId);
    }
  };

  React.useEffect(() => {
    getDataIfLoggedIn();
  }, []);

  const retrieveClientData = (userId) => {
    GetClientDetails(userId)
      .then((response) => {
        var cd = response.data; // client data
        setName(cd.name);
        setEmail(cd.email);
        setNumTel(cd.numTel);
        setDateNaissance(cd.dateDeNaissance);

        setRecordedAppointments(cd.appointment);
        setRecordedMessages(cd.message);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sepValue = "     ";

  return (
    <div>
      <div align="center">
        <Form noValidate>
          <Form.Row>
            <h1 align="center">Fiche Client</h1>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="name">
              <Form.Label>Nom : </Form.Label>
              {sepValue}
              <Form.Label>{name}</Form.Label>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="email">
              <Form.Label>Adresse électronique : </Form.Label>
              {sepValue}
              <Form.Label>{email}</Form.Label>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="email">
              <Form.Label>N° Téléphone : </Form.Label>
              {sepValue}
              <Form.Label>{numTel}</Form.Label>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="email">
              <Form.Label>Date de naissance : </Form.Label>
              {sepValue}
              <Form.Label>{dateNaissance}</Form.Label>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>

      {ListAppointments(recordedAppointments)}

      <h2>Vos messages déjà enregistrés (les plus récents d'abord)</h2>

      {ListMessages(false, recordedMessages)}
    </div>
  );
}
