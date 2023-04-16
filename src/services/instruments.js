import http from "./http-common";
class InstrumentDataService {
  create(data) {
    return http.post("/performance-t3/instruments", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/instruments/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/instruments");
  }
  getInstrumentById(id) {
    return http.get(`/performance-t3/instruments/id/${id}`);
  }
  getByType(id) {
    return http.get(`/performance-t3/instruments/type/${id}`);
  }
  getByName(id) {
    return http.get(`/performance-t3/instruments/name/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/instruments/${id}`);
  }
}
export default new InstrumentDataService();
