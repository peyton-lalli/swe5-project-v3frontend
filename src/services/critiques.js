import http from "./http-common";
class CritiquesDataService {
  create(data) {
    return http.post("/performance-t3/critiques", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/critiques/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/critiques");
  }
  getInstructor(id) {
    return http.get(`/performance-t3/critiques/instructor/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/critiques/${id}`);
  }
}
export default new CritiquesDataService();
