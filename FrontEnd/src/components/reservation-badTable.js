//import React from "react";
import React, { Component } from 'react';

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "../css/button.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { GetClientAppointments } from "../http_calls/clientAppointments";


const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.background.default,
		},
	},
}))(TableRow);

function createData(
	horaire,
	lundi,
	mardi,
	mercredi,
	jeudi,
	vendredi,
	samedi,
	dimanche
) {
	return { horaire, lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche };
}

const rows = [
	createData("8h30-9h30", "", "", "", "", "", "", ""),
	createData("9h30-10h30", "", "", "", "", "", "", ""),
	createData("10h30-11h30", "", "", "", "", "", "", ""),
	createData("11h30-12h30", "", "", "", "", "", "", ""),
	createData("13h30-14h30", "", "", "", "", "", "", ""),
	createData("14h30-15h30", "", "", "", "", "", "", ""),
	createData("15h30-16h30", "", "", "", "", "", "", ""),
];

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

// muted function to class
//export default function Reservation() {

// gives problem in class ; so moved and muted inside render
//	const classes = useStyles();

class Reservation extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("did mount ;-)")
		GetClientAppointments()
	}

	render() {
		//		const { classes } = this.props;

		const { component: Component, ...rest } = this.props;

		//				<form className={classes.container} noValidate>
		// 				<form className={this.props.classes.root} noValidate>

		//						className={classes.textField}

		// 					<Table className={classes.table} aria-label="customized table">


		return (
			<div>
				<h1>Réservation</h1>

				<form noValidate>

					<TextField
						id="date"
						label="Semaine du :"
						type="date"
						defaultValue="2020-04-29"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</form>
				<TableContainer component={Paper}>
					<Table aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Horaire</StyledTableCell>
								<StyledTableCell align="right">Lundi</StyledTableCell>
								<StyledTableCell align="right">Mardi&nbsp;</StyledTableCell>
								<StyledTableCell align="right">Mercredi&nbsp;</StyledTableCell>
								<StyledTableCell align="right">Jeudi&nbsp;</StyledTableCell>
								<StyledTableCell align="right">Vendredi&nbsp;</StyledTableCell>
								<StyledTableCell align="right">Samedi&nbsp;</StyledTableCell>
								<StyledTableCell align="right">Dimanche&nbsp;</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<StyledTableRow key={row.name}>
									<StyledTableCell component="th" scope="row">
										{row.horaire}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.lundi}
										<ButtonGroup
											aria-label="outlined primary button group"
											variant="contained"
										>
											<Button class="button"></Button>
										</ButtonGroup>
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.mardi}
										<ButtonGroup
											aria-label="outlined primary button group"
											variant="contained"
										>
											<Button class="button"></Button>
										</ButtonGroup>
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.mercredi}
										<ButtonGroup
											aria-label="outlined primary button group"
											variant="contained"
										>
											<Button class="button"></Button>
										</ButtonGroup>
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.jeudi}
										<ButtonGroup
											aria-label="outlined primary button group"
											variant="contained"
										>
											<Button class="button"></Button>
										</ButtonGroup>
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.vendredi}
										<ButtonGroup
											aria-label="outlined primary button group"
											variant="contained"
										>
											<Button class="button"></Button>
										</ButtonGroup>
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.samedi}
										<ButtonGroup
											aria-label="outlined primary button group"
											variant="contained"
										>
											<Button class="button"></Button>
										</ButtonGroup>
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.dimanche}
										<ButtonGroup
											aria-label="outlined primary button group"
											variant="contained"
										>
											<Button class="button"></Button>
										</ButtonGroup>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}


export default Reservation