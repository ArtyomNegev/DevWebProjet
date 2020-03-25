import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import banner from "../assets/banner.png";

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

export default function Accueil() { 
	const classes = useStyles();

	return (
		<div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <h1>Accueil</h1>
        </Grid>
		<Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <img alt="Bannière" src={banner} width="512" height="421"/>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
	); 
}