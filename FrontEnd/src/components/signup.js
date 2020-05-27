import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Authenticate } from "../http_calls/session";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import { Link, Redirect } from "react-router-dom";
import { CreateClient } from "../http_calls/client";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45%",
    },
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Signup() {
  const [Nom, setNom] = React.useState("");
  const [Prenom, setPrenom] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [numTel, setnumTel] = React.useState("");
  const [dateDeNaissance, setdateDeNaissance] = React.useState("");
  const [Mdp, setMdp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const timer = React.useRef();
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setMdp(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClick = () => {
    setLoading(true);
    setSuccess(false);
    CreateClient(Nom, Prenom, Email, numTel, dateDeNaissance, Mdp).then(() => {
      setNom("");
      setPrenom("");
      setEmail("");
      setdateDeNaissance("");
      setMdp("");
      setnumTel("");
      setRedirect(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1200);
    });
  };
  return (
    <Grid container spacing={3}>
      <Link to="/">
        <HomeRoundedIcon color="primary"></HomeRoundedIcon>
      </Link>
      {redirect && <Redirect to="/login" />}
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
            value={Nom}
            variant="filled"
            onChange={(e) => setNom(e.target.value)}
          />
          <br></br>
          <TextField
            id="Prenom"
            label="Prénom"
            value={Prenom}
            variant="filled"
            onChange={(e) => setPrenom(e.target.value)}
          />
          <br></br>
          <TextField
            id="numTel"
            label="Numéro de Téléphone"
            value={numTel}
            variant="filled"
            onChange={(e) => setnumTel(e.target.value)}
          />
          <br></br>
          <TextField
            id="dateDeNaissance"
            label="Date de naissance"
            type="date"
            value={dateDeNaissance}
            variant="filled"
            onChange={(e) => setdateDeNaissance(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br>
          <TextField
            id="Email"
            value={Email}
            label="Adresse mail"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          {/* <TextField
            id="Mdp"
            label="Mot de passe"
            variant="outlined"
            centered
            onChange={(e) => setMdp(e.target.value)}
         /> */}
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
          >
            <InputLabel htmlFor="Mdp">Mot de passe</InputLabel>
            <FilledInput
              id="Mdp"
              type={values.showPassword ? "text" : "password"}
              value={(values.password, Mdp)}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <br></br>

          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={handleClick}
          >
            Créez votre compte
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          <br></br>
        </form>
      </Grid>
    </Grid>
  );
}
