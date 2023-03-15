import http from "./http-common";
class EventSongsDataService {
  create(data) {
    return http.post("/performance-t3/eventsongs", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/eventsongs/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/eventsongs");
  }
  getEventSignupId(id) {
    return http.get(`/performance-t3/eventsongs/eventsignupId/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/eventsongs/${id}`);
  }
}
export default new EventSongsDataService();
