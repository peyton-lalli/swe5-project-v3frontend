import http from "./http-common";
class StudentInstructorDataService {
  create(data) {
    return http.post("/performance-t3/studentinstructors", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/studentinstructors/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/studentinstructors");
  }
  getAllStudents(id) {
    return http.get(`/performance-t3/studentinstructors/getStudents/${id}`);
  }
  getStudent(id) {
    return http.get(`/performance-t3/studentinstructors/studentid/${id}`);
  }
  getInstructor(id) {
    return http.get(`/performance-t3/studentinstructors/instructorid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/studentinstructors/${id}`);
  }
}
export default new StudentInstructorDataService();
