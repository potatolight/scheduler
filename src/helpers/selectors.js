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
};

export function getInterview(state, interview) {
  const info = {};
  if(!interview) {
    return null;
  }
  info["student"]=interview["student"];
  const interKey = interview["interviewer"];
  info["interviewer"] = state.interviewers[interKey];
  return info;
};

export function getInterviewersForDay(state, day) {
  let results = [];
  const filterDay = state.days;
  for (let dDay of filterDay) {
    if (day === dDay.name) {
      for (let key of dDay.interviewers) {
        results.push(state.interviewers[key]);
      }
    }
  }
  return results;
};

