import http from "./http-common";
class StudentRepertoireDataService {
  create(data) {
    return http.post("/performance-t3/studentrepertoire", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/studentrepertoire/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/studentrepertoire");
  }
  getStudent(id) {
    return http.get(`/performance-t3/studentrepertoire/studentId/${id}`);
  }
  getRepertoire(id) {
    return http.get(`/performance-t3/studentrepertoire/repertoireId/${id}`);
  }
  getInstrument(id) {
    return http.get(`/performance-t3/studentrepertoire/instrumentId/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/studentrepertoire/${id}`);
  }
}
export default new StudentRepertoireDataService();
