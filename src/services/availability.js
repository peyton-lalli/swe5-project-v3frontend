import http from "./http-common";
class AvailabilityDataService {
  create(data) {
    return http.post("/performance-t3/availability", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/availability/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/availability");
  }
  getUserAndEvent(userId, eventId) {
    return http.get(
      `/performance-t3/availability/getByUserAndEvent/${userId}/${eventId}`
    );
  }
  getStartDate(id) {
    return http.get(`/performance-t3/availability/startdate/${id}`);
  }
  getEndDate(id) {
    return http.get(`/performance-t3/availability/enddate/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/availability/${id}`);
  }
}
export default new AvailabilityDataService();
