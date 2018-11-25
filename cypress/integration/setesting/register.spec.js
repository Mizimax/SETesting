var registerValidData = {
  email: "maxsayr5@gmail.com",
  password: "0847440744",
  confirmPassword: "0847440744"
};
var registerNotValidData = {
  email: "maxsayr5gmail.com",
  password: "0847440744z",
  confirmPassword: "0847440744"
};

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

describe("Register Integration Test", function() {
  beforeEach(function() {
    cy.visit("/src/index.html");
    cy.get("#registerLink").click();
  });
  it(`is email ${registerValidData["email"]} valid ? (True Condition)`, () => {
    cy.get("#email").type(registerValidData["email"]);
    cy.get("#email")
      .invoke("val")
      .then(val => emailRegex.test(val))
      .then(res => expect(res).to.equal(true));
  });

  it(`is email ${
    registerNotValidData["email"]
  } not valid ? (False Condition)`, () => {
    cy.get("#email").type(registerNotValidData["email"]);
    cy.get("#email")
      .invoke("val")
      .then(val => emailRegex.test(val))
      .then(res => expect(res).to.equal(false));
  });

  it("is password and confirm password equal ? (True Condition)", () => {
    cy.get("#password").type(registerValidData["password"]);
    cy.get("#confirmPassword").type(registerValidData["confirmPassword"]);
    cy.get("#password")
      .invoke("val")
      .then(val => {
        cy.get("#confirmPassword")
          .invoke("val")
          .then(vals => expect(val).to.equal(vals));
      });
  });

  it("is password and confirm password not equal ? (False Condition)", () => {
    cy.get("#password").type(registerNotValidData["password"]);
    cy.get("#confirmPassword").type(registerNotValidData["confirmPassword"]);
    cy.get("#password")
      .invoke("val")
      .then(val => {
        cy.get("#confirmPassword")
          .invoke("val")
          .then(vals => expect(val).not.to.equal(vals));
      });
  });

  it("Password should be at least 6 characters (True Condition)", () => {
    cy.get("#password").type("2");
    cy.get("#password")
      .invoke("val")
      .then(val => {
        expect(val).to.have.length.gte(6);
      });
  });

  it("Is password less than 6 characters ? (False Condition)", () => {
    cy.get("#password").type("55555");
    cy.get("#password")
      .invoke("val")
      .then(val => {
        expect(val).to.have.length.lessThan(6);
      });
  });

  // it('register validation test', function() {

  //   let mockData = {
  //     email: "maxza@admin.in.th",
  //     password: "0847440744",
  //     confirmPassword: "0847440744",
  //     nickname: "Maxang"
  //   }

  //   var newResult = {};

  //   cy.window().then(win=>{
  //     console.log(win.auth)
  //     win.auth.validateRegister().then((result)=>{
  //       newResult = Object.keys(result).map(function(key, index) {
  //         var value = result[key];
  //         return value === 0;
  //       });
  //     })

  //     return Object.keys(newResult).length === 0;
  //   })

  // })
});
