/// <reference types="Cypress" />
import RegisterUser from "../json-schemas/register_users"

const Ajv = require("ajv");
const avj = new Ajv();

const registerUser = new RegisterUser();


let endPoints;
beforeEach(() => {
  cy.fixture("api_end_points").then((data) => {
    endPoints = data;
  });
});

class UsersEndPoint {
  registerUserURL() {
    var baseURL = Cypress.config("baseUrl");
    var register_end_point = endPoints.register_user;
    return baseURL + register_end_point;
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
      expect(responseBodyKeys).to.deep.eq(["success", "status", "message", "data"]);
      expect(response.body['message']).to.eql('User account created successfully')
      expect(response.body['status']).to.eql(201)
      expect(response.body['success']).to.eql(true)
      expect(dataBodyKeys).to.deep.eq(["id", "name", "email"]);
      expect(response.body.data['name']).to.eql(userName)
      expect(response.body.data['email']).to.eql(userEmail)
      expect(response.body.data['id']).has.lengthOf(24)
      const schema = registerUser.user_registered_successfully;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
      const userID = response.body.data['id']
      cy.writeFile("cypress/fixtures/registered_user_information.json", {
        name: userName,
        email: userEmail,
        password: userPassword,
        id: userID
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
      expect(response.body['message']).to.eql('An account already exists with the same email address')
      expect(response.body['status']).to.eql(409)
      expect(response.body['success']).to.eql(false)
      const schema = registerUser.registration_failed;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  verifyUserRegistersWithMissingOneParameter(userName, userEmail, userPassword, message) {
    cy.cypressRequest("POST", this.registerUserURL(), {
      name: userName,
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      const responseBodyKeys = Cypress._.keys(response.body);
      expect(response.status).to.eql(400);
      expect(responseBodyKeys).to.deep.eq(["success", "status", "message"]);
      expect(response.body['message']).to.eql(message)
      expect(response.body['status']).to.eql(400)
      expect(response.body['success']).to.eql(false)
      const schema = registerUser.registration_failed;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }
}

module.exports = UsersEndPoint;
