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
    return http.get(`/performance-t3/composers/name/${id}`);
  }
  getId(id) {
    return http.get(`/performance-t3/composers/id/${id}`);
  }
  getBirthYear(id) {
    return http.get(`/performance-t3/composers/birthyear/${id}`);
  }
  getDeathYear(id) {
    return http.get(`/performance-t3/composers/deathyear/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/composers/${id}`);
  }
}
export default new ComposersDataService();
