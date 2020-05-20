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
    calendarStore.setCalendarEvents(evs);
    setInitialized(true);
  };

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



  const handleSelect = (event, e) => {
    const { start, end } = event;
    const data = { title: "", start, end, allDay: false };
    setShowAddModal(true);
    setShowEditModal(false);
    setCalendarEvent(data);
  };

  const handleSelectEvent = (event, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    let { id, title, start, end, allDay } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { id, title, start, end, allDay };
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
	
  return (
    <div className="page">
      <Modal show={showAddModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={false}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={true}
          />
        </Modal.Body>
      </Modal>
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

		
		      if (event.appointment.clientId===2){
		        newStyle.backgroundColor = "lightgreen"
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
