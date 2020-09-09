export function getAppointmentsForDay(state, day) {
  const appointDay = [];
  const filterDay = state.days;
  for(let dDay of filterDay) {
    if(!dDay){
      return [];
    }
    if(dDay.name === day) {
      if(dDay.appointments.length === 0) {
        return dDay;
      } else {
        for(let id of dDay.appointments) {
          appointDay.push(state.appointments[id]);
        }
      }
    }
  }
  return appointDay;
}

export function getInterview(state, interview) {
  const info = {}
  if(!interview) {
    return null
  }
  info["student"]=interview["student"]
  const interKey = interview["interviewer"]
  info["interviewer"] = state.interviewers[interKey]
  return info
}

export function getInterviewersForDay(state, day) {
  let results = [];
  const filterDay = state.days
  for (let dDay of filterDay) {
    if (day === dDay.name) {
      for (let key of dDay.interviewers) {
        results.push(state.interviewers[key]);
      }
    }
  }
  return results;
}


export function getSpotsRemaining (state, day) {
  const noInterviews = getAppointmentsForDay(state, day).filter((appointment) => (!appointment.interview))
  const spotsRemaining = noInterviews.length;
  return spotsRemaining;
}

// export function getInterviewersForDay(state, day) {
//   const interviewer = []
//   let arr;
//   const filterDay = state.days
//   for(const dDay of filterDay) {
//     if(dDay["name"] === day) {
//       arr = dDay["appointments"]
//     }
//   }
//   const appointments = state.appointments;
//   const newArr = []
//   for(const key in appointments) {
//     if(arr.includes(appointments[key]["id"]) && appointments[key]["interview"]) {
//       newArr.push(appointments[key]["interview"]["interviewer"])
//     }
//   }
//   const interviewers = state.interviewers
//  for(const key in interviewers) {
//    if(newArr.includes(interviewers[key]["id"])) {
//     interviewer.push(interviewers[key])
//    }
//  }
//  console.log(interviewer)
//  return interviewer
// }
