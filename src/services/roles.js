import http from "./http-common";
class RolesDataService {
  create(data) {
    return http.post("/performance-t3/roles", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/roles/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/roles");
  }
  getType() {
    return http.get(`/performance-t3/roles/type/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/roles/${id}`);
  }
}
export default new RolesDataService();
