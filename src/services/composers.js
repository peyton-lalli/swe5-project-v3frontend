import http from "./http-common";
class ComposersDataService {
  create(data) {
    return http.post("/performance-t3/composers", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/composers/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/composers");
  }
  getName(id) {
    return http.get(`/performance-t3/composers/startdate/${id}`);
  }
  getBirthYear(id) {
    return http.get(`/performance-t3/composers/enddate/${id}`);
  }
  getDeathYear(id) {
    return http.get(`/performance-t3/composers/enddate/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/composers/${id}`);
  }
}
export default new ComposersDataService();
