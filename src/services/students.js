import http from "./http-common";
class StudentsService {
  create(data) {
    return http.post("/performance-t3/students", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/students/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/students");
  }
  getAllInfo(id) {
    return http.get(`/performance-t3/students/allInfo/${id}`);
  }
  getUserId(id) {
    return http.get(`/performance-t3/students/userid/${id}`);
  }
  getLevel(id) {
    return http.get(`/performance-t3/students/level/${id}`);
  }
  getMajor(id) {
    return http.get(`/performance-t3/students/major/${id}`);
  }
  getClassification(id) {
    return http.get(`/performance-t3/students/classification/${id}`);
  }
  getGoogleId(id) {
    return http.get(`/performance-t3/students/googleid/${id}`);
  }
  getInstrument(id) {
    return http.get(`/performance-t3/students/instrument/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/students/${id}`);
  }
}
export default new StudentsService();
