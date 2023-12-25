/// <reference types="Cypress" />

import Health from "../json-schemas/health";
const Ajv = require("ajv");

const avj = new Ajv();
let health = new Health();

let endPoints;
beforeEach(() => {
  cy.fixture("api_end_points").then((data) => {
    endPoints = data;
  });
});

class HealthEndPoint {
  fullURL() {
    var baseURL = Cypress.config("baseUrl");
    var health_end_point = endPoints.health;
    return baseURL + health_end_point;
  }

  checkHealth() {
    return cy.cypressRequest("GET", this.fullURL(), undefined, undefined);
  }

  verifySuccessStatusCode() {
    this.checkHealth().then((response) => {
      expect(response.status).to.eql(200);
    });
  }

  verifyPresenceOfPropertyAndItsValue(propertyName, propertyValue) {
    this.checkHealth().then((response) => {
      expect(response.body).have.property(propertyName);
      expect(response.body[propertyName]).to.eql(propertyValue);
    });
  }

  verifyJSONResponseSchema() {
    this.checkHealth().then((response) => {
      const schema = health.schema;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }
}

module.exports = HealthEndPoint;
