import http from "./http-common";
class MembersDataService {
  create(data) {
    return http.post("/performance-t3/members", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/members/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/members");
  }
  delete(id) {
    return http.delete(`/performance-t3/members/${id}`);
  }
}
export default new MembersDataService();
