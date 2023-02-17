import http from "./http-common";
class EnsembleDataService {
  create(data) {
    return http.post("/performance-t3/ensemble", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/ensemble/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/ensemble");
  }
  getName(id) {
    return http.get(`/performance-t3/ensemble/name/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/ensemble/${id}`);
  }
}
export default new EnsembleDataService();
