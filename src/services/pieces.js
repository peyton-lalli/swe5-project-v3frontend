import http from "./http-common";
class PiecesDataService {
  create(data) {
    return http.post("/performance-t3/pieces", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/pieces/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/pieces");
  }
  getId(id) {
    return http.get(`/performance-t3/pieces/id/${id}`);
  }
  getName(id) {
    return http.get(`/performance-t3/pieces/name/${id}`);
  }
  getLyrics(id) {
    return http.get(`/performance-t3/pieces/lyrics/${id}`);
  }
  getTranslation(id) {
    return http.get(`/performance-t3/pieces/translation/${id}`);
  }
  getLanguage(id) {
    return http.get(`/performance-t3/pieces/language/${id}`);
  }
  getRepertoire(id) {
    return http.get(`/performance-t3/pieces/studentrepertoireid/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/pieces/${id}`);
  }
}
export default new PiecesDataService();
