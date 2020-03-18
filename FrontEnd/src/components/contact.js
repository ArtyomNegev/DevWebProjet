import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CreateMessageAndClient } from "../http_calls/message";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%"
    }
  }
}));

export default function Contact() {
  const [Nom, setNom] = React.useState("");
  const [Prenom, setPrenom] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [numTel, setnumTel] = React.useState("");
  const [dateDeNaissance, setdateDeNaissance] = React.useState("");
  const [Sujet, setSujet] = React.useState("");
  const [Message, setMessage] = React.useState("");
  const classes = useStyles();
  const handleClick = () => {
    CreateMessageAndClient(
      Nom,
      Prenom,
      Email,
      numTel,
      dateDeNaissance,
      Sujet,
      Message
    );
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="Nom"
        label="Nom"
        variant="outlined"
        onChange={e => setNom(e.target.value)}
      />
      <br></br>
      <TextField
        id="Prenom"
        label="Prénom"
        variant="outlined"
        onChange={e => setPrenom(e.target.value)}
      />
      <br></br>
      <TextField
        id="Email"
        label="Email"
        variant="outlined"
        onChange={e => setEmail(e.target.value)}
      />
      <br></br>
      <TextField
        id="numTel"
        label="numéro de Téléphone"
        variant="outlined"
        onChange={e => setnumTel(e.target.value)}
      />
      <br></br>
      <TextField
        id="date"
        label="Date de naissance"
        type="date"
        defaultValue="2020-01-01"
        variant="outlined"
        onChange={e => setdateDeNaissance(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="Sujet"
        label="Sujet"
        variant="outlined"
        onChange={e => setSujet(e.target.value)}
      />

      <TextField
        id="Message"
        label="Message"
        multiline
        rows="8"
        fullWidth="true"
        variant="outlined"
        onChange={e => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Validate
      </Button>
    </form>
  );
}
