import React from "react";
import { Calendar, globalizeLocalizer  } from "react-big-calendar";
import globalize from 'globalize'
//import moment from "moment";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "./CalendarForm";

import { observer } from "mobx-react";

import "../css/Calendar.css";


import { getCalendar } from "../http_calls/calendar";

import "react-big-calendar/lib/css/react-big-calendar.css"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



// import dates from 'react-big-calendar/lib/utils/dates';

require('globalize/lib/cultures/globalize.culture.fr')

//const localizer = momentLocalizer(moment);
const localizer = globalizeLocalizer(globalize)

function Agenda({ calendarStore }) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [calendarEvent, setCalendarEvent] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);

  const [currentCalDate, setCurrentCalDate] = React.useState(new Date());
  const [calendarEvents, setCalendarEvents] = React.useState({});
  const [calView, setCalView] = React.useState('week');

  const [isMod, setIsMod] = React.useState(localStorage.getItem('moderator')==='true');



  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const getCalendarEvents = async () => {
    const response = await getCalendar();
    const evs = response.data.map(d => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end)
      };
    });

	//console.log('events', evs)

    calendarStore.setCalendarEvents(evs);
    setInitialized(true);
  };

/*
  const getCalendarEvents2 = async () => {
    const response = await getCalendar();
	let evs = []
	if (response!== undefined) {
	    evs = response.data.map(d => {
	      return {
	        ...d,
	        start: new Date(d.start),
	        end: new Date(d.end)
	      };
	    });
	} else {
		console.log('response undefined')
	}
	console.log('events', evs)
    calendarStore.setCalendarEvents(evs);
    setInitialized(true);
  };
*/


  const handleSelect = (event, e) => {
	
	if (calView==='month')  {
		// not allowed to select slot in  month view !!
		return;
	}
	

//	console.log('isMod', isMod)
	
    const { start, end } = event;


	if (!isMod &&  (end-start>3600*1000)) {
		alert("Sélectionnez seulement une plage, s'il vous plait.")
		return ;
	}

    const data = { title: "", start, end, allDay: false };

	if (start.toLocaleTimeString()==='00:00:00') {
		// not allowed to select slot for all day (even for moderator)
		return ;
	}

    setShowAddModal(true);
    setShowEditModal(false);
    setCalendarEvent(data);
  };

  const handleSelectEvent = (event, e) => {
	
	if (!isMod && event.appointment.clientId===-1) {
		//do not allow to change appointment out of ownership
		return ; 
	}
	
    setShowAddModal(false);
    setShowEditModal(true);
    // let { id, title, start, end, allDay } = event;
    let { start, end, allDay } = event;
    let title = event.appointment.commentaire
	let id = event.appointment.id
    start = new Date(start);
    end = new Date(end);
    let client = null
    if (isMod) {
	   console.log('event.client',event.client)
	   client = event.client
	   console.log('client',client)
    }
    const data = { id, title, start, end, allDay, client };
    setCalendarEvent(data);
  };


  React.useEffect(() => {
    if (!initialized) {
      getCalendarEvents();
    }
  });

	const messages = {
	  allDay: 'journ\u00e9e',
	  previous: 'pr\u00e9c\u00e9dent',
	  next: 'suivant',
	  today: 'aujourd\'hui',
	  month: 'mois',
	  week: 'semaine',
	  day: 'jour',
	  agenda: 'agenda',
	  date: 'date',
	  time: 'heure',
	  event: '\u00e9v\u00e9nement', // Or anything you want
	  showMore: total => `+ ${total} \u00e9v\u00e9nement(s) suppl\u00e9mentaire(s)`
	}
	
	// className="page"
	
	// show={showAddModal} onHide={hideModals}
	
  const handleClose = () => {
    setShowAddModal(false);
  };	
	
  return (
    <div >
	
	<Dialog open={showAddModal} onClose={hideModals} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un rendez-vous</DialogTitle>

        <DialogContent>
          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={false}
          />
        </DialogContent>
      </Dialog>


	<Dialog open={showEditModal} onClose={hideModals} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier un rendez-vous</DialogTitle>

        <DialogContent>

          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={true}
          />
        </DialogContent>
      </Dialog>

      <Calendar
        localizer={localizer}
        events= {calendarStore.calendarEvents} // {calendarStore.calendarEvents}  // {calendarEvents}
        startAccessor="start"
        endAccessor="end"

		messages={messages} 

		step={60}
		timeslots={1}


		culture='fr-FR'

		min={new Date(2020, 0, 1, 9, 0)} // 8.00 AM
		max={new Date(2020, 11, 30, 17, 0)} // Max will be 6.00 PM!
		
	//	date={new Date(2020, 4, 4)}
	    date={currentCalDate}

	// does block navigation if we set default view as week !

		view={calView}
		views={["week","month" , "day", "agenda" ]}  //  "work_week"
		
		onView={(view)=>{
                setCalView(view)
            }}

        selectable={true}
        style={{ height: "70vh" }}   // 500
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}


		 eventPropGetter={
		    (event, start, end, isSelected) => {
		      let newStyle = {
		        backgroundColor: "lightgrey",
		        color: 'black',
		        borderRadius: "0px",
		        border: "none"
		      };

		
		      if (event.appointment.clientId!==-1){
				if (isMod && event.appointment.clientId===0) {
					newStyle.backgroundColor = "lightblue"
				}
				else
				{
		        	newStyle.backgroundColor = "lightgreen"
				}
		      }
		
		      return {
		        className: "",
		        style: newStyle
		      };
		    }
		  }


		 onNavigate = {(date, view, action) => {
            //	console.log(dates.firstVisibleDay(date), dates.lastVisibleDay(date));
        		console.log('onNavigate ',date, view, action);
				setCurrentCalDate(date)
        		}
		}
		
		//dates: Date[] | { start: Date; end: Date }, view?: 'month'|'week'|'work_week'|'day'|'agenda'
		onRangeChange = {(obj) => {
			console.log('onRangeChange ', obj);
			getCalendarEvents()
			}
		}
		



      />
    </div>
  );
}

export default observer(Agenda);