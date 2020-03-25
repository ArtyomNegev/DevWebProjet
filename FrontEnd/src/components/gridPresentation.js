import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import img from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";

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
        <Grid item xs={12}>
          <h1>Presentation</h1>
        </Grid>
        <Grid item xs={6}>
          <div id="presentation">
            <p id="p1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              ultrices viverra nunc lacinia finibus. Vestibulum nunc mi,
              interdum ac feugiat sit amet, ullamcorper eu dolor. Sed laoreet
              arcu ac felis sodales, non ornare tellus tempus.
              <br></br>
              Morbi blandit massa eget eros porta, sed scelerisque neque
              molestie. Sed nec tempus est. Aenean metus ante, scelerisque eget
              posuere lacinia, condimentum id nisl. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Vestibulum ut justo non ante eleifend volutpat ullamcorper at
              nisi.<br></br>
              Fusce convallis finibus ex, non rhoncus erat consequat sed. Duis
              pretium et dui nec pellentesque. Phasellus in ultrices turpis.
              Etiam mollis ligula vitae dignissim accumsan. Ut sodales a lorem
              sit amet tempus. Etiam pellentesque id mi sed pretium. Praesent
              maximus, ligula quis eleifend volutpat, eros sem cursus libero,
              vel cursus massa neque sit amet est. Pellentesque id hendrerit
              sapien. Sed vulputate in ex ut imperdiet. Maecenas et elit vitae
              lectus condimentum blandit. Nam eget convallis augue, quis aliquet
              sapien. Nunc a vehicula sem.
            </p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img alt="mental health" src={img2} />
        </Grid>

        <Grid item xs={6}>
          <img alt="mental health" src={img} />
        </Grid>
        <Grid item xs={6}>
          <div id="presentation2">
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
