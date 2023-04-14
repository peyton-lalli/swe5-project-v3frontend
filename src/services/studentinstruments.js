import http from "./http-common";
class StudentInstrumentDataService {
  create(data) {
    return http.post("/performance-t3/studentinstruments", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/studentinstruments/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/studentinstruments");
  }
  getStudentInstrumentById(id) {
    return http.get(`/performance-t3/studentinstruments/id/${id}`);
  }
  getStudentId(id) {
    return http.get(`/performance-t3/studentinstruments/studentId/${id}`);
  }
  getByInstrumentId(id) {
    return http.get(`/performance-t3/studentinstruments/instrumentId/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/studentinstruments/${id}`);
  }
}
export default new StudentInstrumentDataService();
