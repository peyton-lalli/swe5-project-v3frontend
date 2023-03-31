import http from "./http-common";
class EventSignUpDataService {
  create(data) {
    return http.post("/performance-t3/eventsignup", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/eventsignup/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/eventsignup");
  }
  getTimeSlot(id) {
    return http.get(`/performance-t3/eventsignup/timeslot/${id}`);
  }
  getEventId(id) {
    return http.get(`/performance-t3/eventsignup/eventid/${id}`);
  }
  getNeedsApproval(id) {
    return http.get(`/performance-t3/eventsignup/needsAdminApproval/${id}`);
  }
  getStudentId(id) {
    return http.get(`/performance-t3/eventsignup/studentid/${id}`);
  }
  getEnsembleId(id) {
    return http.get(`/performance-t3/eventsignup/ensembleid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/event/${id}`);
  }
}
export default new EventSignUpDataService();
