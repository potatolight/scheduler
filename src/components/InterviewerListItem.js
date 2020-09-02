import React from "react";
import "components/InterviewerListItem.scss";
var classnames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewer = classnames({
    "interviewers__item": true,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected,
  })
  return (
    <li className={interviewer} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}