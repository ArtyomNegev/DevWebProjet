import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Authenticate } from "../http_calls/session";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import { Link, Redirect } from "react-router-dom";
import { CreateClient } from "../http_calls/client";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45%",
    },
  },
}));

export default function Signup() {
  const [Nom, setNom] = React.useState("");
  const [Prenom, setPrenom] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [numTel, setnumTel] = React.useState("");
  const [dateDeNaissance, setdateDeNaissance] = React.useState("");
  const [Mdp, setMdp] = React.useState("");

  const classes = useStyles();
  const handleClick = () => {
    CreateClient(Nom, Prenom, Email, numTel, dateDeNaissance, Mdp);
  };
  return (
    <Grid container spacing={3}>
      <Link to="/">
        <HomeRoundedIcon color="primary"></HomeRoundedIcon>
      </Link>
      <Grid item xs={5}></Grid>
      <Grid item xs={2} align="center">
        {" "}
      </Grid>
      <Grid item xs={5}></Grid>
      <Grid item xs={12} align="center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="Nom"
            label="Nom"
            variant="outlined"
            onChange={(e) => setNom(e.target.value)}
          />
          <br></br>
          <TextField
            id="Prenom"
            label="Prénom"
            variant="outlined"
            onChange={(e) => setPrenom(e.target.value)}
          />
          <br></br>
          <TextField
            id="numTel"
            label="Numéro de Téléphone"
            variant="outlined"
            onChange={(e) => setnumTel(e.target.value)}
          />
          <br></br>
          <TextField
            id="dateDeNaissance"
            label="Date de naissance"
            // type="date"
            variant="outlined"
            onChange={(e) => setdateDeNaissance(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br>
          <TextField
            id="Email"
            label="Adresse mail"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <TextField
            id="Mdp"
            label="Mot de passe"
            variant="outlined"
            centered
            onChange={(e) => setMdp(e.target.value)}
          />

          <br></br>

          <Button variant="contained" color="primary" onClick={handleClick}>
            Créez votre compte
          </Button>
          <br></br>
        </form>
      </Grid>
    </Grid>
  );
}
