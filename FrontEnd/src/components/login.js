import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { Authenticate } from "../http_calls/session";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";
import { Link, Redirect } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
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

export default function Login() {
  const [email, setemail] = React.useState("");
  const [Mdp, setMdp] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const setSuccess = React.useState(false);
  const timer = React.useRef();
  const classes = useStyles();

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
    Authenticate(email, Mdp)
      .then(() => {
        setMdp("");
        setemail("");

        timer.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          setRedirect(true);
        }, 1200);
      })
      .catch((error) => {
        console.log("error auth UI " + error);
        setLoading(false);
        setLoginError(true);
      });
  };
  return (
    <Grid container spacing={2}>
      <Link to="/">
        <HomeRoundedIcon color="primary"></HomeRoundedIcon>
      </Link>
      {redirect && <Redirect to="/" />}

      <Grid item xs={5}></Grid>

      <Grid item xs={2} align="center">
        {" "}
        <img alt="logo" src={logo} width="140" height="140" id="RightSideImg" />
      </Grid>
      <Grid item xs={5}></Grid>
      <Grid item xs={12} align="center">
        {loginError ? "Erreur lors de l'authentification" : null}
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="email"
            label="Adresse mail"
            value={email}
            variant="filled"
            onChange={(e) => setemail(e.target.value)}
          />
          <br></br>
          {/*  <TextField
            id="Mdp"
            label="Mot de passe"
            variant="outlined"
            centered
            onChange={(e) => setMdp(e.target.value)}
        />*/}
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

          <Button variant="contained" color="primary" onClick={handleClick}>
            Login
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}

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
