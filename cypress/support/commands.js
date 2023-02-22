Cypress.Commands.add("vueField", (fieldLabel) => {
  return cy.contains(fieldLabel).siblings("input");
});

Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("VITE_APP_CLIENT_ID"),
      client_secret: Cypress.env("VITE_APP_CLIENT_SECRET"),
      refresh_token: Cypress.env("VITE_APP_REFRESH_TOKEN"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;
    let url =
      (Cypress.env("VITE_APP_CLIENT_URL").includes("localhost")
        ? "http://localhost"
        : Cypress.env("VITE_APP_CLIENT_URL")) + "/performance-t3/login";
    cy.request({
      method: "POST",
      url: url,
      body: { credential: id_token, accessToken: access_token },
    }).then(({ body }) => {
      cy.log(body);
      window.localStorage.setItem("user", JSON.stringify(body));
      cy.visit("/dashboard");
    });
  });
});

Cypress.Commands.add("logout", () => {
  let token = JSON.parse(window.localStorage.getItem("user")).token;
  let url =
    (Cypress.env("VITE_APP_CLIENT_URL").includes("localhost")
      ? "http://localhost"
      : Cypress.env("VITE_APP_CLIENT_URL")) + "/performance-t3/logout";
  cy.request({
    method: "POST",
    url: url,
    body: { token: token },
  }).then(({ body }) => {
    cy.log(body);
    window.localStorage.removeItem("user");
    cy.visit("/");
  });
});
