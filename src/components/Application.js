import React, { useState, useEffect }from "react";
import axios from "axios";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import "components/Application.scss";

import { getAppointmentsForDay } from "helpers/selectors";
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Yaya",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Lele ",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   }
// ];


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
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
    Promise.all([
      promise1,
      promise2
    ]).then((results) => {
      console.log(results)
      let [result1, result2] = results
      setState(prev =>({days: result1.data, appointments: result2.data}));
    });
  }, [])
  const day = state.day
  const appointments = getAppointmentsForDay(state, day)
  const list = appointments.map(appointment => {
    
    
    return (
      <Appointment
      key={appointment.id}
      {...appointment} />
    )
  })

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
        {list}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
