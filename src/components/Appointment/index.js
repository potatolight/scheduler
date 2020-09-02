import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"

const classnames = require('classnames');

export default function Appointment(props) {
  console.log(props.interview)
  return (
    <article className="appointment">
    <Header time={props.time} />
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
  </article>
  )
}