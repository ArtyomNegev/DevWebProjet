import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableCell from '@material-ui/core/TableCell';

import Paper from '@material-ui/core/Paper';

import EnhancedTable from "./reusablePaginatedTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80%",
    },
  },
  paperA: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(5),

    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

//      width: 320,

export default function ListAppointments(recordedAppointments) {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('JWTtoken')!=null);

  const classes = useStyles();


const headCells = [
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'heure', numeric: false, disablePadding: false, label: 'Heure' },
];



const renderCellsFct = (appointment) => {
	return ( 
				<React.Fragment>
	                <TableCell >{new Date(appointment.debut).toLocaleDateString()}</TableCell>
	                <TableCell >de {new Date(appointment.debut).toLocaleTimeString()} à {new Date(appointment.fin).toLocaleTimeString()}</TableCell>
				</React.Fragment>
		);
} 

return (
		<div>	   
	    {
		   loggedIn &&
 			<div>
			<Paper className={classes.paperA}>

				{EnhancedTable(headCells, recordedAppointments, false,10, "Vos rendez-vous déjà enregistrés (les plus récents d'abord)", renderCellsFct)}

			
			</Paper>
			<p/>
			</div>
		}
		</div>
  );
}
