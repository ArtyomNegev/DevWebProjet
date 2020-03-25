import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MapInfos from "./map";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
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
          <h1>Infos</h1>
          <p>
            {" "}
            Pour toute demande de renseignements complémentaires, vous pouvez me
            contacter par téléphone, mail ou en remplissant le formulaire de
            contact
          </p>
          <p>
            contact@valériecampaignolle <br></br>
            <br></br>
            Adresse de consultation :<br></br>
            Avenue Louis Barthou 144, Bordeaux
          </p>
          <MapInfos></MapInfos>
        </Grid>
      </Grid>
    </div>
  );
}