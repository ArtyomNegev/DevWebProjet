import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Accueil from "./accueil";
import Infos from "./infos";
import Contact from "./contact";
import Presentation from "./presentation";
import Paper from "@material-ui/core/Paper";
import Reservation from "./reservation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Paper elevation={0} />
        <Paper />
        <Paper elevation={3} />
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Accueil" />
          <Tab label="Presentation" />
          <Tab label="Infos" />
          <Tab label="Réservation" />
          <Tab label="Contact" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}><Accueil></Accueil></TabPanel>
      <TabPanel value={value} index={1}><Presentation></Presentation></TabPanel>
      <TabPanel value={value} index={2}><Infos></Infos></TabPanel>
      <TabPanel value={value} index={3}><Reservation></Reservation></TabPanel>
      <TabPanel value={value} index={4}><Contact></Contact></TabPanel>
    </div>
  );
}