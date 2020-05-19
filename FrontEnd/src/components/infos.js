import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MapInfos from "./map";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Infos() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <div align="center">
            <h1 align="center">Infos</h1>
            <p>
              Pour toute demande de renseignements complémentaires, vous pouvez
              me contacter par téléphone, mail ou en remplissant le formulaire
              de contact.
            </p>
            <p style={{ fontWeight: "bold" }}>
              Mail : contact@valériecampaignolle
            </p>
            <p style={{ fontWeight: "bold" }}>Téléphone : +33 574 25 32 91</p>
            <p>
              Adresse de consultation :<br></br>
              Avenue Louis Barthou 144, Bordeaux
            </p>

            <MapInfos></MapInfos>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
