import http from "./http-common";
class RequirementsDataService {
  create(data) {
    return http.post("/performance-t3/requirements", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/requirements/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/requirements");
  }
  getClassification(id) {
    return http.get(`/performance-t3/requirements/classification/${id}`);
  }
  getName(id) {
    return http.get(`/performance-t3/requirements/name/${id}`);
  }
  getDescription(id) {
    return http.get(`/performance-t3/requirements/description/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/requirements/${id}`);
  }
}
export default new RequirementsDataService();
