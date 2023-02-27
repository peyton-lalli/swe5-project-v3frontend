import http from "./http-common";
class StudentInfoDataService {
  create(data) {
    return http.post("/performance-t3/studentinfo", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/studentinfo/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/studentinfo");
  }
  getInstructorId(id) {
    return http.get(`/performance-t3/studentinfo/instructorId/${id}`);
  }
  getUserId(id) {
    return http.get(`/performance-t3/studentinfo/userid/${id}`);
  }
  getLevel(id) {
    return http.get(`/performance-t3/studentinfo/level/${id}`);
  }
  getMajor(id) {
    return http.get(`/performance-t3/studentinfo/major/${id}`);
  }
  getClassification(id) {
    return http.get(`/performance-t3/studentinfo/classification/${id}`);
  }
  getGoogleId(id) {
    return http.get(`/performance-t3/studentinfo/googleid/${id}`);
  }
  getInstrument(id) {
    return http.get(`/performance-t3/studentinfo/instrument/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/studentinfo/${id}`);
  }
}
export default new StudentInfoDataService();
