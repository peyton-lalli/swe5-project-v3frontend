import http from "./http-common";
class RepertoireDataService {
  create(data) {
    return http.post("/performance-t3/repertoire", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/repertoire/${id}`, data);
  }
  getStudentId(id) {
    return http.get(`/performance-t3/repertoire/studentinfoid/${id}`);
  }
  getAll() {
    return http.get("/performance-t3/repertoire");
  }
  delete(id) {
    return http.delete(`/performance-t3/repertoire/${id}`);
  }
}
export default new RepertoireDataService();
