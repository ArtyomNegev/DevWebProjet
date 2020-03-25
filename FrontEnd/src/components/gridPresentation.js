import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";

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

export default function GridPresentation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <h1>Presentation</h1>
        </Grid>
        <Grid item xs={6}>
          <div id="LeftSideText">
            <p>
              <br></br>
              Integer sit amet ipsum mollis, elementum lacus eu, iaculis enim.
              Praesent in lacinia massa. Pellentesque posuere dolor porttitor,
              laoreet orci eu, laoreet leo. Quisque pretium accumsan sapien vel
              tincidunt. Cras efficitur erat id neque elementum aliquet.
              Maecenas convallis justo orci, et dictum justo lobortis non.
              <br></br> Nulla venenatis iaculis eleifend. Mauris dapibus magna
              sed sapien ultricies bibendum. Nullam metus augue, vestibulum eu
              urna vel, facilisis molestie eros. Ut vestibulum, augue ac
              molestie vehicula, lorem quam viverra velit, lobortis varius eros
              neque nec turpis.
              <br></br>
              Integer semper consequat massa in viverra. Phasellus sit amet
              tempor urna. Phasellus accumsan, dui id lobortis lobortis, velit
              nulla accumsan tortor, a posuere erat odio pulvinar nisi. Cras
              dignissim purus in nisi condimentum luctus. Sed dictum neque in
              odio faucibus, ac bibendum nisi convallis. Sed venenatis elementum
              lorem, eget tristique sapien lacinia id. Aliquam erat volutpat.
              Sed interdum lacus massa, non ultrices neque pharetra ut.
              Phasellus nec eros tortor. Quisque ac efficitur elit. Mauris sed
              tellus aliquam, mollis magna vel, cursus ipsum. Pellentesque
              dapibus velit vitae odio tincidunt, a egestas nulla euismod. Donec
              sodales commodo enim, eget lobortis libero venenatis vitae. Nunc
              eget ultricies massa, at fringilla mi. Suspendisse aliquet eu mi
              vitae molestie. Donec bibendum nulla ut erat vehicula, nec
              consectetur massa consequat.
            </p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img alt="mental health" src={logo} width="400" height="400" id="RightSideImg"/>
        </Grid>
        <Grid item xs={6}>
          <img alt="mental health" src={logo} width="400" height="400" id="LeftSideImg"/>
        </Grid>
        <Grid item xs={6}>
          <div id="RightSideText">
            <p>
              <br></br>
              Integer sit amet ipsum mollis, elementum lacus eu, iaculis enim.
              Praesent in lacinia massa. Pellentesque posuere dolor porttitor,
              laoreet orci eu, laoreet leo. Quisque pretium accumsan sapien vel
              tincidunt. Cras efficitur erat id neque elementum aliquet.
              Maecenas convallis justo orci, et dictum justo lobortis non.
              <br></br> Nulla venenatis iaculis eleifend. Mauris dapibus magna
              sed sapien ultricies bibendum. Nullam metus augue, vestibulum eu
              urna vel, facilisis molestie eros. Ut vestibulum, augue ac
              molestie vehicula, lorem quam viverra velit, lobortis varius eros
              neque nec turpis.
              <br></br>
              Integer semper consequat massa in viverra. Phasellus sit amet
              tempor urna. Phasellus accumsan, dui id lobortis lobortis, velit
              nulla accumsan tortor, a posuere erat odio pulvinar nisi. Cras
              dignissim purus in nisi condimentum luctus. Sed dictum neque in
              odio faucibus, ac bibendum nisi convallis. Sed venenatis elementum
              lorem, eget tristique sapien lacinia id. Aliquam erat volutpat.
              Sed interdum lacus massa, non ultrices neque pharetra ut.
              Phasellus nec eros tortor. Quisque ac efficitur elit. Mauris sed
              tellus aliquam, mollis magna vel, cursus ipsum. Pellentesque
              dapibus velit vitae odio tincidunt, a egestas nulla euismod. Donec
              sodales commodo enim, eget lobortis libero venenatis vitae. Nunc
              eget ultricies massa, at fringilla mi. Suspendisse aliquet eu mi
              vitae molestie. Donec bibendum nulla ut erat vehicula, nec
              consectetur massa consequat.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
