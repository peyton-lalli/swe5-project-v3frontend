import http from "./http-common";
class StudentInstructorDataService {
  create(data) {
    return http.post("/performance-t3/studentinstructor", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/studentinstructor/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/studentinstructor");
  }
  getStudent(id) {
    return http.get(`/performance-t3/studentinstructor/studentinfoid/${id}`);
  }
  getInstructor(id) {
    return http.get(`/performance-t3/studentinstructor/instructorid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/studentinstructor/${id}`);
  }
}
export default new StudentInstructorDataService();
