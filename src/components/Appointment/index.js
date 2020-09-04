import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "components/Appointment/Form"
const classnames = require('classnames');

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function onAdd() {
    transition(CREATE)
  }
  function onCancel() {
    back()
  }
  function onSave() {

  }
 
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd ={onAdd} />}   
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onCancel}/>} 
  </article>
  )
}