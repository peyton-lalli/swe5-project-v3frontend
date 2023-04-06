import http from "./http-common";
class EventSignUpJurorDataService {
  create(data) {
    return http.post("/performance-t3/eventsignupjuror", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/eventsignupjuror/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/eventsignupjuror");
  }
  getEventSignUpJurorByEventSignUp(id) {
    return http.get(`/performance-t3/eventsignupjuror/eventsignupid/${id}`);
  }
  getEventSignUpJurorByInstructor(id) {
    return http.get(`/performance-t3/eventsignupjuror/instructorid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/eventsignupjuror/${id}`);
  }
}
export default new EventSignUpJurorDataService();
