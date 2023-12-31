// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "cypressRequest",
  (methodName, urlToWork, payload = undefined, queryString = undefined) => {
    if (payload != undefined) {
      return cy.request({
        method: methodName,
        url: urlToWork,
        form: true,
        failOnStatusCode: false,
        body: payload,
        headers: {
          accept: "application/json",
        },
      });
    } else if (queryString != undefined) {
      return cy.request({
        method: methodName,
        url: urlToWork,
        qs: queryString,
        headers: {
          accept: "application/json",
        },
      });
    } else {
      return cy.request({
        method: methodName,
        url: urlToWork,
        headers: {
          accept: "application/json",
        },
      });
    }
  }
);

Cypress.Commands.add("getAllKeysOfObject", () => {
  for (const [key] of Object.entries(response.body)) {
    cy.log(`${key}`);
  }
});

Cypress.Commands.add("addContext", (context) => {
  cy.log(context);
  cy.once("test:after:run", (test) =>
    addContext({ test }, new Date().toLocaleString() + " - " + context)
  );
});

Cypress.Commands.add("verifyText", (element, textToVerify) => {
  element.then(function (e) {
    const t = e.text();
    expect(t).to.contains(textToVerify);
  });
});

Cypress.Commands.add("verifyURL", (urlToBeExpected) => {
  cy.url().should("eq", urlToBeExpected);
});