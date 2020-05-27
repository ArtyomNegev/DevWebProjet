import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Accueil from "./accueil";
import Infos from "./infos";
import Contact from "./contact";
import Presentation from "./presentation";
import Paper from "@material-ui/core/Paper";
import Reservation from "./reservation";
import { Link, Redirect } from "react-router-dom";
import Login from "./login";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const isLoggedIn = () => {
  let result = localStorage.getItem("JWTtoken") != null;
  console.log("navtabs isLoggedIn ", result);
  return result;
};

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //       <Tab label="Login" />
  // ...

  /*     <TabPanel value={value} index={5}>
// 		<Login isLoggedInParam={isLoggedIn()}></Login>
		</TabPanel>
*/

  //   <Link to="/login?isLoggedIn={isLoggedIn()}">

  return (
    <div className={classes.root}>
      <AppBar position="dynamic">
        <Paper elevation={0} />
        <Paper />
        <Paper elevation={3} />
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="scrollable"
          //variant="fullWidth"
          scrollButtons="on"
          aria-label="simple tabs example"
        >
          <Tab label="Accueil" />
          <Tab label="Presentation" />
          <Tab label="Infos / Contact" />
          <Tab label="Réservation" />

          <Link to="/login">
            <IconButton>
              <AccountCircleIcon></AccountCircleIcon>
            </IconButton>
          </Link>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Accueil></Accueil>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Presentation></Presentation>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Infos></Infos>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Reservation></Reservation>
      </TabPanel>
    </div>
  );
}
