import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CreateMessage } from "../http_calls/message";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
    },
  },
}));

export default function Contact() {
  const [Sujet, setSujet] = React.useState("");
  const [Message, setMessage] = React.useState("");
  const classes = useStyles();
  const handleClick = () => {
    CreateMessage(Sujet, Message);
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
              variant="outlined"
              onChange={(e) => setSujet(e.target.value)}
            />

            <TextField
              id="Message"
              label="Message"
              multiline
              rows="8"
              fullWidth="true"
              variant="outlined"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleClick}>
              Envoyer
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
