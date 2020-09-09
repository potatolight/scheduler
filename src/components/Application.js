import React, { useState, useEffect }from "react";
import axios from "axios";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import "components/Application.scss";
import useApplicatinData from "../hooks/useApplicationData"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicatinData();


  const day = state.day
  const appointments = getAppointmentsForDay(state, day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, day)
  
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
         <hr className="sidebar__separator sidebar--centered" />
         <nav className="sidebar__menu">
            <DayList
             days={state.days} 
             day={state.day} 
             setDay={setDay}
            />
         </nav>
         <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
        />
        </>}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
