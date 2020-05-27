import React from "react";
import { makeStyles } from "@material-ui/core/styles";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EnhancedTable from "./reusablePaginatedTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
    },
  },
  paperA: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(5),
    width: 320,
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  tableA: {
    minWidth: 150,
    maxWidth: 300,
  },
}));

export default function ListMessages(colClient,recordedMessages) {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('JWTtoken')!=null);

  const classes = useStyles();

  const formatDateAndTime = (isoDate, sepFr) => {
	let d = new Date(isoDate)

	return d.toLocaleDateString() + sepFr + d.toLocaleTimeString()
  }

function getHeadCells(colClient) {
	const result = 	
	 [
	  { id: 'client', numeric: false, disablePadding: true, label: 'Client' },
	  { id: 'envoiDate', numeric: false, disablePadding: false, label: 'Envoyé à' },
	  { id: 'sujet', numeric: false, disablePadding: false, label: 'Sujet' },
	  { id: 'contenu', numeric: false, disablePadding: false, label: 'Contenu' },
	];
	
	if (colClient) { 
		return result 
	} 
	else {
		return result.slice(1,4) 
	}
}

function getTableTitle(colClient) {
	if (colClient) {
		return "Messages (les plus récents d'abord)"
	} else {
		return "Vos messages déjà enregistrés (les plus récents d'abord)"
	}
}


const renderCellsFct = (message) => {
	return ( 
				<React.Fragment>
					{colClient &&
	              		<TableCell style={{ width: 300 }}><a href={"client/"+message.Client.userId} target="_blank">{message.Client.name}</a></TableCell>
					}
	                <TableCell style={{ width: 200 }}>le {formatDateAndTime(message.dateEnvoi,' à ')}</TableCell>
	                <TableCell style={{ width: 300 }}>{message.sujet}</TableCell>
	                <TableCell>{message.contenu}</TableCell>
				</React.Fragment>
		);
} 

return (
		<div>	   
	    {
		   loggedIn &&
 			<div>
			<blockquote>
			<Paper className={classes.paper}>
			
			{EnhancedTable(getHeadCells(colClient), recordedMessages, false,10, getTableTitle(colClient), renderCellsFct)}

			</Paper>
			</blockquote>


			</div>
		}
		</div>
  );
}
