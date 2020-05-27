import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

import TextField from '@material-ui/core/TextField';


import {
  addCalendar,
  editCalendar,
  getCalendar,
  deleteCalendar
} from "../http_calls/calendar";

import { observer } from "mobx-react";

const buttonStyle = { marginRight: 10 };

function CalendarForm({ calendarStore, calendarEvent, onCancel, edit }) {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [id, setId] = React.useState(null);
  const [duration, setDuration] = React.useState("1");
  const [client,setClient] = React.useState(null);

  const [isMod, setIsMod] = React.useState(localStorage.getItem('moderator')==='true');

React.useEffect(() => {
	
	console.log(calendarEvent.client);
	
    setTitle(calendarEvent.title);
    setStart(calendarEvent.start);
    setEnd(calendarEvent.end);
    setId(calendarEvent.id);
    setClient(calendarEvent.client);

    console.log(client);
  }, [
    calendarEvent.title,
    calendarEvent.start,
    calendarEvent.end,
    calendarEvent.id,
    calendarEvent.client
  ]);

const handleSubmit = async ev => {
    ev.preventDefault();
    if (!title || !start || !end) {
      return;
    }
    if (+start > +end) {
      alert("Start date must be earlier than end date");
      return;
    }
    const data = { id, title, start, end };
    if (!edit) {
      await addCalendar(data);
    } else {
      await editCalendar(data);
    }
    const response = await getCalendar();
    const evs = response.data.map(d => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end)
      };
    });
    calendarStore.setCalendarEvents(evs);
    onCancel();
  };

  const handleStartChange = date => setStart(date);
  const handleEndChange = date => setEnd(date);
  const handleTitleChange = ev => setTitle(ev.target.value);
  const handleDurationChange = ev => {
	let nbHours = parseInt(ev.target.value);
	console.log('nbHours', nbHours)
	setEnd(new Date(start.getTime()+3600*nbHours*1000))
	console.log('end', end)
	
	}

const deleteCalendarEvent = async () => {
    await deleteCalendar(calendarEvent.id);
    const response = await getCalendar();
    const evs = response.data.map(d => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end)
      };
    });
    calendarStore.setCalendarEvents(evs);
    onCancel();
  };


return (
    <Form noValidate onSubmit={handleSubmit}>
     {isMod &&
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="title">
          <Form.Label>Client</Form.Label>
			<br/>
			{
				(client) && 
				<a href={"client/"+client.userId} target="_blank">{client.name}</a>
			}
			<br/>
        </Form.Group>
      </Form.Row>
     }


      <Form.Row>
        <Form.Group as={Col} md="12" controlId="title">
          <Form.Label>Commentaire</Form.Label>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            value={title || ""}
            onChange={handleTitleChange}
            fullWidth
          />

          <Form.Control.Feedback type="invalid">{!title}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

<Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Date de début</Form.Label> &nbsp;  &nbsp;  &nbsp;
		  <Form.Label>{new Date(start).toLocaleDateString()}</Form.Label>
        </Form.Group>
      </Form.Row>

<Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Heure de début </Form.Label>   &nbsp;  &nbsp;  &nbsp;

		  <Form.Label>{new Date(start).toLocaleTimeString()}</Form.Label>
        </Form.Group>
      </Form.Row>

<Form.Row>
		{ false && 

		 <Form.Group as={Col} md="12" controlId="start">
		<br/>
          <Form.Label>Durée</Form.Label>
		<br/>
		   <TextField
				onChange={handleDurationChange}
				value={duration || "1" }
		    />
		<Form.Label> h</Form.Label>
		<br/>
        </Form.Group>}

		{ true && 
		<Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Durée</Form.Label>
		&nbsp;  &nbsp;  &nbsp;

		<Form.Label>{(end-start)/(3600*1000)} h</Form.Label>
		        </Form.Group>
		}

		  
      </Form.Row>
		<br/>

      <Button type="submit" style={buttonStyle}>
        Enregistrer
      </Button>

	 {isMod  && 
		<Button type="button" style={buttonStyle} onClick={deleteCalendarEvent} >
        Supprimer
        </Button>
    	}
      
      <Button type="button" onClick={onCancel}>
        Annuler
      </Button>
    </Form>
  );
}

export default observer(CalendarForm);