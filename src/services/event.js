import http from "./http-common";
class EventDataService {
  create(data) {
    return http.post("/performance-t3/event", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/event/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/event");
  }
  getAllEventsWithInfo() {
    return http.get("/performance-t3/event/allEventsWithInfo");
  }
  getId(id) {
    return http.get(`/performance-t3/event/id/${id}`);
  }
  getTitle(id) {
    return http.get(`/performance-t3/event/title/${id}`);
  }
  getDate(id) {
    return http.get(`/performance-t3/event/date/${id}`);
  }
  getType(id) {
    return http.get(`/performance-t3/event/type/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/event/${id}`);
  }
}
export default new EventDataService();
