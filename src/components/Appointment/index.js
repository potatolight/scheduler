import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT= "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }
  
  function onAdd() {
    transition(CREATE);
  }

  function onCancel() {
    back();
  }

  function onDelete() {
    transition(CONFIRMING);
  }

  //onConfirm butten which means confirm to delete
  function onConfirm() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() =>transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
   
  function onEdit() {
    transition(EDIT);
  }
 
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd ={onAdd} />}   
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onCancel} onSave={save}/>}
      {mode === EDIT && (
        <Form 
          name={props.interview.student} 
          interviewers={props.interviewers} 
          interviewer={props.interview.interviewer.id} 
          onCancel={onCancel} 
          onSave={save}
        />
      )}
      {mode === CONFIRMING && (
        <Confirm 
          message = "Are you sure you would like to delete?" 
          onCancel={onCancel} onConfirm={onConfirm}
        />
      )}
      {mode ===SAVING &&   <Status message="Saving"/> }
      {mode === DELETING && <Status message="Deleting"/> }
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={onCancel}/>}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={onCancel}/>}
    </article>
  )
}