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
import Signup from "./signup";

import ListAppointments from "./listClientAppointments";
import ListMessages from "./listClientMessages";
import ListClients from "./listClients";


import { GetClientAppointments } from "../http_calls/clientAppointments";
import { GetClientMessages } from "../http_calls/message";
import { GetClients } from "../http_calls/client";

//import Modal from "./Modal";

import { Link, Redirect } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import EnhancedTable from "./demo-table";

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
  paper: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(5),
    width: '80%',
    minWidth: 470,
    maxWidth: 1570,
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  paperA: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(5),
    width: 320,
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 450,
    maxWidth: 1550,
  },
  tableA: {
    minWidth: 150,
    maxWidth: 300,
  },
}));

//export default function Login(props)  {

export default function Login()  {
  const [email, setemail] = React.useState("");
  const [Mdp, setMdp] = React.useState("");
  const [showModal, setShowModal] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('JWTtoken')!=null);

  const [recordedAppointments, setRecordedAppointments] = React.useState([]);
  const [recordedMessages, setRecordedMessages] = React.useState([]);

  const [isMod, setIsMod] = React.useState(localStorage.getItem('moderator')==='true');
  const [clients, setClients] = React.useState([]);


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

	React.useEffect(() => {
		    getDataIfLoggedIn();
		  }, []);



  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });


  const getDataIfLoggedIn = () => {
	// console.log('getDataIfLoggedIn')
	if (loggedIn)
	//  and  check validity  (by  some  http calls ?) 
	{
		retrieveMessages()
		if (isMod) {
			retrieveClients()			
		} else {
			retrieveAppointments()
		}
	}
	else {
		// no data
	}
  };

  const retrieveAppointments = () => {
	    GetClientAppointments()
	      .then(response => {
	        setRecordedAppointments(response.data);
	        // console.log(response.data);
	      })
	      .catch(e => {
	        console.log(e);
	      });
	  };

  const retrieveMessages = () => {
	    GetClientMessages()
	      .then(response => {
	        setRecordedMessages(response.data);
	        // console.log(response.data);
	      })
	      .catch(e => {
	        console.log(e);
	      });
	  };

  const retrieveClients = () => {
	    GetClients()
	      .then(response => {
	        setClients(response.data);
	        // console.log(response.data);
	      })
	      .catch(e => {
	        console.log(e);
	      });
	  };

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

  const handleClickLogout = () => {
	localStorage.removeItem('JWTtoken')
	setRedirect(true)
	}

  const handleClick = () => {
    setLoading(true);
    setSuccess(false);
    Authenticate(email, Mdp).then(() => {
      setMdp("");
      setemail("");

      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setRedirect(true);
      }, 1200);
    }).catch((error) => {
		console.log('error auth UI '+error);
		setSuccess(false);
		setLoading(false);
		setLoginError(true);
		alert('L\'authentification a \u00e9chou\u00e9')
	}
	);
  };


  const isLoggedIn= ()=> {
    return loggedIn ; 
}
/*
  const hideModalFct = ( () => {
    setShowModal(false);
    setLoginError(false);
  });

*/

	return (
		<div>
		
		{redirect && <Redirect to="/" />}
		
		
		<Link to="/">
	        <HomeRoundedIcon color="primary"></HomeRoundedIcon>
	    </Link>
  			
	    {
		   isLoggedIn() &&

			<div>
			<form>
			<Button variant="contained" color="primary" onClick={handleClickLogout}>
	            Logout
	          </Button>
			</form>
			<p/>
		
		   { !isMod &&  
			   ListAppointments(recordedAppointments)
			}
			
			{ListMessages(isMod,recordedMessages)}

			<p/>
			<p/>
			
			{ isMod &&
			<div>
				{ListClients(clients)}			 
			</div>
			}			
			
		</div>
		}
		
		
	    {
		   isLoggedIn()==false &&
		    <Grid container spacing={2}>
		
		

		      
		      <Grid item xs={5}></Grid>
		
		      <Grid item xs={2} align="center">
		        {" "}
		        <img alt="logo" src={logo} width="140" height="140" id="RightSideImg" />
		      </Grid>
		      <Grid item xs={5} >
			</Grid>
		
		      <Grid item xs={12} align="center">
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
	      
		}

	  </div>

	  );
	
}
