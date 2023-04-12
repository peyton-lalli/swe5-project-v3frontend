import http from "./http-common";
class EventTimeDataService {
  create(data) {
    return http.post("/performance-t3/eventtime", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/eventtime/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/eventtime");
  }
  getStartTime(id) {
    return http.get(`/performance-t3/eventtime/starttime/${id}`);
  }
  getEndTime(id) {
    return http.get(`/performance-t3/eventtime/endtime/${id}`);
  }
  getInterval(id) {
    return http.get(`/performance-t3/eventtime/interval/${id}`);
  }
  getEventId(id) {
    return http.get(`/performance-t3/eventtime/eventid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/eventtime/${id}`);
  }
}
export default new EventTimeDataService();
