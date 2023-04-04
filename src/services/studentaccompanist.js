import http from "./http-common";
class StudentAccompanistDataService {
  create(data) {
    return http.post("/performance-t3/studentaccompanist", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/studentaccompanist/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/studentaccompanist");
  }
  getStudent(id) {
    return http.get(`/performance-t3/studentaccompanist/studentinfoid/${id}`);
  }
  getAccompanist(id) {
    return http.get(`/performance-t3/studentaccompanist/accompanistid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/studentaccompanist/${id}`);
  }
}
export default new StudentAccompanistDataService();
