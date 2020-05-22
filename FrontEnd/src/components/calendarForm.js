import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

import TextField from "@material-ui/core/TextField";

import {
  addCalendar,
  editCalendar,
  getCalendar,
  deleteCalendar,
} from "../http_calls/calendar";

import { observer } from "mobx-react";

const buttonStyle = { marginRight: 10 };

function CalendarForm({ calendarStore, calendarEvent, onCancel, edit }) {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [id, setId] = React.useState(null);
  const [canDelete, setCanDelete] = React.useState(
    localStorage.getItem("moderator") === "true"
  );

  React.useEffect(() => {
    console.log("canDelete", canDelete);

    setTitle(calendarEvent.title);
    setStart(calendarEvent.start);
    setEnd(calendarEvent.end);
    setId(calendarEvent.id);
  }, [
    calendarEvent.title,
    calendarEvent.start,
    calendarEvent.end,
    calendarEvent.id,
  ]);

  const handleSubmit = async (ev) => {
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
    const evs = response.data.map((d) => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
    calendarStore.setCalendarEvents(evs);
    onCancel();
  };

  const handleStartChange = (date) => setStart(date);
  const handleEndChange = (date) => setEnd(date);
  const handleTitleChange = (ev) => setTitle(ev.target.value);

  const deleteCalendarEvent = async () => {
    await deleteCalendar(calendarEvent.id);
    const response = await getCalendar();
    const evs = response.data.map((d) => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
    calendarStore.setCalendarEvents(evs);
    onCancel();
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
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
          <Form.Label>Date de début</Form.Label>
          <br />
          <Form.Label>{new Date(start).toLocaleDateString()}</Form.Label>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Heure de début </Form.Label>
          <br />
          <Form.Label>{new Date(start).toLocaleTimeString()}</Form.Label>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Durée</Form.Label>
          <br />
          <Form.Label>1 h</Form.Label>
        </Form.Group>
      </Form.Row>

      <Button type="submit" style={buttonStyle}>
        Save
      </Button>

      {canDelete && (
        <Button type="button" style={buttonStyle} onClick={deleteCalendarEvent}>
          Delete
        </Button>
      )}

      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}

export default observer(CalendarForm);
