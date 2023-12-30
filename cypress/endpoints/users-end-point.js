/// <reference types="Cypress" />
import RegisterUser from "../json-schemas/register_users";
import LoginUsers from "../json-schemas/login_users";

const Ajv = require("ajv");
const avj = new Ajv();

const registerUser = new RegisterUser();
const loginUser = new LoginUsers();

let endPoints;
let registeredUserInfo;

beforeEach(() => {
  cy.fixture("api_end_points").then((data) => {
    endPoints = data;
  });
  cy.fixture("registered_user_information").then((data) => {
    registeredUserInfo = data;
  });
});

class UsersEndPoint {
  registerUserURL() {
    var baseURL = Cypress.config("baseUrl");
    var register_end_point = endPoints.register_user;
    return baseURL + register_end_point;
  }

  loginUserURL() {
    var baseURL = Cypress.config("baseUrl");
    var login_end_point = endPoints.login_user;
    return baseURL + login_end_point;
  }

  verifyUserRegistersSuccessFully(userName, userEmail, userPassword) {
    cy.cypressRequest("POST", this.registerUserURL(), {
      name: userName,
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      const responseBodyKeys = Cypress._.keys(response.body);
      const dataBodyKeys = Cypress._.keys(response.body.data);
      expect(response.status).to.eql(201);
      expect(responseBodyKeys).to.deep.eq([
        "success",
        "status",
        "message",
        "data",
      ]);
      expect(response.body["message"]).to.eql(
        "User account created successfully"
      );
      expect(response.body["status"]).to.eql(201);
      expect(response.body["success"]).to.eql(true);
      expect(dataBodyKeys).to.deep.eq(["id", "name", "email"]);
      expect(response.body.data["name"]).to.eql(userName);
      expect(response.body.data["email"]).to.eql(userEmail);
      expect(response.body.data["id"]).has.lengthOf(24);
      const schema = registerUser.user_registered_successfully;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
      const userID = response.body.data["id"];
      cy.writeFile("cypress/fixtures/registered_user_information.json", {
        name: userName,
        email: userEmail,
        password: userPassword,
        id: userID,
      });
    });
  }

  verifyUserRegistersWithExistingEmail(userName, userEmail, userPassword) {
    cy.cypressRequest("POST", this.registerUserURL(), {
      name: userName,
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      const responseBodyKeys = Cypress._.keys(response.body);
      expect(response.status).to.eql(409);
      expect(responseBodyKeys).to.deep.eq(["success", "status", "message"]);
      expect(response.body["message"]).to.eql(
        "An account already exists with the same email address"
      );
      expect(response.body["status"]).to.eql(409);
      expect(response.body["success"]).to.eql(false);
      const schema = registerUser.registration_failed;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  verifyUserRegistersWithMissingOneParameter(
    userName,
    userEmail,
    userPassword,
    message
  ) {
    cy.cypressRequest("POST", this.registerUserURL(), {
      name: userName,
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      const responseBodyKeys = Cypress._.keys(response.body);
      expect(response.status).to.eql(400);
      expect(responseBodyKeys).to.deep.eq(["success", "status", "message"]);
      expect(response.body["message"]).to.eql(message);
      expect(response.body["status"]).to.eql(400);
      expect(response.body["success"]).to.eql(false);
      const schema = registerUser.registration_failed;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  verifyUserLoginSuccessFully(userEmail, userPassword, userName) {
    cy.cypressRequest("POST", this.loginUserURL(), {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      const responseBodyKeys = Cypress._.keys(response.body);
      const dataBodyKeys = Cypress._.keys(response.body.data);
      expect(response.status).to.eql(200);
      expect(responseBodyKeys).to.deep.eq([
        "success",
        "status",
        "message",
        "data",
      ]);
      expect(response.body["message"]).to.eql("Login successful");
      expect(response.body["success"]).to.eql(true);
      expect(dataBodyKeys).to.deep.eq(["id", "name", "email", "token"]);
      expect(response.body.data["name"]).to.eql(userName);
      expect(response.body.data["email"]).to.eql(userEmail);
      expect(response.body.data["id"]).to.eql(registeredUserInfo.id);
      expect(response.body.data["token"]).has.lengthOf(64);
      const schema = loginUser.login_successful;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  verifyUserLoginWithInvalidEmailOrPassword(userEmail, userPassword) {
    cy.cypressRequest("POST", this.loginUserURL(), {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      expect(response.status).to.eql(401);
      expect(response.body["message"]).to.eql("Incorrect email address or password");
      expect(response.body["success"]).to.eql(false);
      const schema = loginUser.login_failed;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  verifyUserLoginWithoutEmailOrPassword(userEmail, userPassword, message) {
    cy.cypressRequest("POST", this.loginUserURL(), {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body["message"]).to.eql(message);
      expect(response.body["success"]).to.eql(false);
      const schema = loginUser.login_failed;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }
}

module.exports = UsersEndPoint;
