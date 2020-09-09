import React, {useState, useEffect} from "react";
import axios from "axios";
import { getSpotsRemaining } from "../helpers/selectors"
export default function useApplicatinData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
    spots: 5
  });

  const setDay = (day) =>{
    setState({...state, day});
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const day = {
    //   ...state.days.find(day => day.appointments.includes(id)),
    //   ...state.days[id-1].spots-=1
    //   }

   return  axios.put(`/api/appointments/${id}`, appointment)
   .then(()=>{
    setState(prev=>({
      ...prev, appointments
    }))
  }).then(()=>{
    // console.log("fetching test")
    axios.get(`/api/days`)
    .then( result=>{

      setState(prev=>({
      ...prev, days:result.data
    }))})
  })
}


  function cancelInterview(id){
    const appointment={
      ...state.appointments[id],
      interview:null
    }
    const appointments={
      ...state.appointments,
      [id]: appointment
    }

    getSpotsRemaining(state, state.day)
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(()=>{
      setState(prev=>({
        ...prev, appointments
      }))
    }).then(()=>{
      axios.get(`/api/days`)
      .then( result=>{setState(prev=>({
        ...prev, days:result.data
      }))})
    })
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}