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
/// <reference types="cypress" />

import WelcomePage from "../pages/welcomePage";
import LoginUserPage from "../pages/loginUserPage";

const welcomePage = new WelcomePage();
const loginUserPage = new LoginUserPage();

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("callingJSONValue", () => {
  cy.fixture("imp_info").then((data) => {
    info = data;
  });
});

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

Cypress.Commands.add("loginUser", (email, password) => {
  cy.reload();
  welcomePage.clickOnLoginButton();
  loginUserPage.verifyLoginTitleDisplaying();
  loginUserPage.enterEmailOnEmailLoginField(email);
  loginUserPage.enterPasswordOnPasswordLoginField(password);
  loginUserPage.clickOnLoginButton();
});

Cypress.Commands.add("getUserToken", () => {
  cy.cypressRequest(
    "POST",
    "https://practice.expandtesting.com/notes/api/users/login",
    {
      email: "taimoor_test12322@gmail.com",
      password: "Test@12345",
    }
  ).then((response) => {
    const token = response.body.data["token"];
    cy.writeFile("cypress/user_data/token.txt", token);
  });
});

Cypress.Commands.add("getAllNoteIDs", () => {
  let notes_ids = [];
  cy.readFile("cypress/user_data/token.txt").then((token) =>
    cy
      .request({
        method: "GET",
        url: "https://practice.expandtesting.com/notes/api/notes",
        form: true,
        failOnStatusCode: false,
        timeout: 30000,
        headers: {
          accept: "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        let results = response.body.data;
        for (let i of results) {
          notes_ids.push(i.id);
        }
        cy.wrap(notes_ids);
      })
  );
});

Cypress.Commands.add("deleteAllCreatedNotes", () => {
  cy.readFile("cypress/user_data/token.txt").then((token) =>
    cy.getAllNoteIDs().then((value) => {
      for (let i of value) {
        cy.request({
          method: "DELETE",
          url: "https://practice.expandtesting.com/notes/api/notes/" + i,
          form: true,
          failOnStatusCode: false,
          timeout: 30000,
          headers: {
            accept: "application/json",
            "x-auth-token": token,
          },
        }).then((response) => {
          cy.log(response.status);
        });
      }
    })
  );
});

Cypress.Commands.add(
  "createNote",
  (url, noteTitle, noteDescription, noteCategory) => {
    return cy.readFile("cypress/user_data/token.txt").then((token) => {
      cy.request({
        method: "POST",
        url: url,
        form: true,
        failOnStatusCode: false,
        timeout: 30000,
        body: {
          title: noteTitle,
          description: noteDescription,
          category: noteCategory,
        },
        headers: {
          accept: "application/json",
          "x-auth-token": token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    });
  }
);
