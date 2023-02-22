import http from "./http-common";
class InstructorsDataService {
  create(data) {
    return http.post("/performance-t3/instructors", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/instructors/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/instructors");
  }
  getTitle(id) {
    return http.get(`/performance-t3/instructors/title/${id}`);
  }
  getGoogleId(id) {
    return http.get(`/performance-t3/instructors/googleid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/instructors/${id}`);
  }
}
export default new InstructorsDataService();
