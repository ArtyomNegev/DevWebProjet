import React, { useState, useEffect } from "react";
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

import Agenda from "./agenda";
import { CalendarStore } from "./store";

import { GetClientAppointments } from "../http_calls/clientAppointments";

export default function Reservation() {
  //const classes = useStyles();

  const [recordedAppointments, setRecordedAppointments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentPageDate, setCurrentPageDate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );

  const [calendarStore, setCalendarStore] = useState(new CalendarStore());

  const [isMod, setIsMod] = React.useState(
    localStorage.getItem("moderator") === "true"
  );

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    GetClientAppointments()
      .then((response) => {
        setRecordedAppointments(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formatDateAndTime = (isoDate, sepFr) => {
    let d = new Date(isoDate);
    /*	let dateFr = [d.getDate(), d.getMonth()+1, d.getFullYear()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('/')
	let timeFr = isoDate.split('T')[1].substring(0,5)
	return dateFr+sepFr+timeFr;
*/

    return d.toLocaleDateString() + sepFr + d.toLocaleTimeString();
  };

  const setActiveAppointment = (tutorial, index) => {
    //setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  //  split('T')[1].substring(0,5)}

  return (
    <div>
      {!isMod && (
        <div>
          <h1>Réservations</h1>

          <h3>
            Pour voir la liste de vos rendez-vous déjà enregistrés, voir dans
            l'onglet de droite
          </h3>
        </div>
      )}
      <br />
      <Agenda calendarStore={calendarStore} />
    </div>
  );
}
