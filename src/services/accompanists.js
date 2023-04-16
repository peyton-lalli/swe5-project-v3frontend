import http from "./http-common";
class Accompanists {
  create(data) {
    return http.post("/performance-t3/accompanists", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/accompanists/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/accompanists");
  }
  getAccompanistById(id) {
    return http.get(`/performance-t3/accompanists/id/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/accompanists/${id}`);
  }
}
export default new Accompanists();
