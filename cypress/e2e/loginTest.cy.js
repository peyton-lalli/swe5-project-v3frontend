describe("performance", () => {
  // Test initial non-logged-in user page load
  it("can load the login page", () => {
    cy.visit("/");
    cy.contains("MUSIC DEPARTMENT");
  });

  // Test login function
  it("can login", () => {
    cy.visit("/");
    cy.loginByGoogleApi();
    cy.contains("Your Events");
  });
});
