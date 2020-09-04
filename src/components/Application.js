import React, { useState, useEffect }from "react";
import axios from "axios";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import "components/Application.scss";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });
  
  const setDays = (days) => {
    setState((prev) => ({...prev, days}))
  }

  const setDay = (day) =>{
    console.log("day" , day)
    // const newState = {...state, day};
    // newState.day = day;
    setState({...state, day});
  }

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments")
    const promise3 = axios.get("/api/interviewers")
    Promise.all([
      promise1,
      promise2,
      promise3
    ]).then((results) => {
      let [result1, result2, result3] = results
      setState(prev =>({...prev, days: result1.data, appointments: result2.data, interviewers: result3.data}));
    });
  }, [])

  // const day = state.day
  // const appointments = getAppointmentsForDay(state, day)
  // const list = appointments.map(appointment => {
    
  //   return (
  //     <Appointment
  //     key={appointment.id}
  //     {...appointment} />
  //   )
  // })
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
