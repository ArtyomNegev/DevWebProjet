import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { CreateMessage } from "../http_calls/message";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
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

export default function Contact() {
  const [Sujet, setSujet] = React.useState("");
  const [Message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
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

  const handleClick = (event) => {
    setLoading(true);
    event.preventDefault();
    setSuccess(false);
    CreateMessage(Sujet, Message).then(() => {
      setMessage("");
      setSujet("");
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1200);
    });
  };
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <div align="center">
          <h1 align="center">Contact</h1>
          <br></br>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="Sujet"
              label="Sujet"
              value={Sujet}
              variant="outlined"
              onChange={(e) => setSujet(e.target.value)}
            />

            <TextField
              id="Message"
              label="Message"
              multiline
              rows="8"
              value={Message}
              fullWidth="true"
              variant="outlined"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={handleClick}
            >
              Envoyer
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
