import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Authenticate } from "../http_calls/session";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";
import Signup from "./signup";
import { Link, Redirect } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45%",
    },
  },
}));

export default function Login() {
  const [email, setemail] = React.useState("");
  const [Mdp, setMdp] = React.useState("");

  const classes = useStyles();
  const handleClick = () => {
    Authenticate(email, Mdp);
  };
  return (
    <Grid container spacing={2}>
      <Link to="/">
        <HomeRoundedIcon color="primary"></HomeRoundedIcon>
      </Link>
      <Grid item xs={5}></Grid>

      <Grid item xs={2} align="center">
        {" "}
        <img alt="logo" src={logo} width="140" height="140" id="RightSideImg" />
      </Grid>
      <Grid item xs={5}></Grid>
      <Grid item xs={12} align="center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="email"
            label="Adresse mail"
            variant="outlined"
            onChange={(e) => setemail(e.target.value)}
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
            Login
          </Button>
          <br></br>
          <Link to="/signup">
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Pas encore de compte ? créez-en un ici
            </Button>
          </Link>
        </form>
      </Grid>
    </Grid>
  );
}
