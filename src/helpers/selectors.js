export function getAppointmentsForDay(state, day) {
  const appointDay = []
  const filterDay = state.days
  for(let dDay of filterDay) {
    if(!dDay){
      return []
    }
    if(dDay.name === day) {
      if(dDay.appointments.length === 0) {
        return dDay
      } else {
        for(let id of dDay.appointments) {
          appointDay.push(state.appointments[id])
        }
      }
    }
  }
  return appointDay
}
