import React from "react";
import "components/DayListItem.scss";
var classnames = require('classnames');

export default function DayListItem(props) {
  const list = classnames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  const formatSpots = () =>{
    if(props.spots === 0) {
      return 'no spots remaining';
    }
    if(props.spots === 1) {
      return '1 spot remaining';
    }
    if(props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
  }
  return (
    <li className={list} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}