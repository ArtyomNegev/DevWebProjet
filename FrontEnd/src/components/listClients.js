import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableCell from '@material-ui/core/TableCell';
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

export default function ListMessages(clients) {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('JWTtoken')!=null);

  const classes = useStyles();

  const formatDateAndTime = (isoDate, sepFr) => {
	let d = new Date(isoDate)

	return d.toLocaleDateString() + sepFr + d.toLocaleTimeString()
  }

const headCells = [
  { id: 'client', numeric: false, disablePadding: true, label: 'Client' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Adresse électronique' },
  { id: 'telephone', numeric: false, disablePadding: false, label: 'N° Téléphone' },
  { id: 'dateDeNaissance', numeric: false, disablePadding: false, label: 'Date de naissance' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Client depuis' },
];



const renderCellsFct = (client) => {
	return ( 
				<React.Fragment>
					<TableCell component="th"  scope="row" padding="none">
                        <a href={"client/"+client.userId} target="_blank">{client.name}</a>
                      </TableCell>

                      <TableCell align="left">{client.email}</TableCell>
                      <TableCell align="left">{client.numTel}</TableCell>
                      <TableCell align="left">{new Date(client.dateDeNaissance).toLocaleDateString()}</TableCell>
                      <TableCell align="left">{new Date(client.createdAt).toLocaleDateString()}</TableCell>
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
			
			{EnhancedTable(headCells, clients, true,10, "Liste des clients", renderCellsFct)}
			


			</Paper>
			</blockquote>


			</div>
		}
		</div>
  );
}
