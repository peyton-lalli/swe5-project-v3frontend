import http from "./http-common";
class EmailingService {
  sendCritiqueNotification(data) {
    return http.post("/performance-t3/mailer/sendnotification", data);
  }
  sendChangeRequest(data) {
    return http.post("/performance-t3/mailer/sendchangerequest", data);
  }
  sendCustomMessage(data) {
    return http.post("/performance-t3/mailer/sendmessage", data);
  }
}
export default new EmailingService();
