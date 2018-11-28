describe("Login Test", function() {
  beforeEach(function() {
    cy.visit("/src/index.html");
    cy.get("#registerLink").click();
  });
  it(``, () => {
    cy.get("#email").type(registerValidData["email"]);
    cy.get("#email")
      .invoke("val")
      .then(val => emailRegex.test(val))
      .then(res => expect(res).to.equal(true));
  });
});
