import UsersEndPoint from "../../endpoints/users-end-point";
let { createRandomEmailAddress } = require("./../../utils/random-util");

let userEndPoint = new UsersEndPoint();
let userData;
let messages;
let registeredEmail;
let registeredUserInfo;

beforeEach(() => {
  cy.fixture("user_information").then((data) => {
    userData = data;
  });
  cy.fixture("registered_user_information").then((data) => {
    registeredUserInfo = data;
  });
  cy.fixture("messages").then((data) => {
    messages = data;
  });
  registeredEmail = createRandomEmailAddress();
});

describe("Notes - Users Registration API", () => {
  it("Register User SuccessFully with Valid Information", () => {
    cy.writeFile("cypress/fixtures/user_information.json", {
      name: "Taimoor Pasha",
      email: registeredEmail,
      password: "Test@12345",
    });
    userEndPoint.verifyUserRegistersSuccessFully(
      userData.name,
      userData.email,
      userData.password
    );
  });

  it("Register User with Existing Email", () => {
    userEndPoint.verifyUserRegistersWithExistingEmail(
        registeredUserInfo.name,
        registeredUserInfo.email,
        registeredUserInfo.password
    );
  });

  it("Register User without entering 'Email' Address", () => {
    userEndPoint.verifyUserRegistersWithMissingOneParameter(
        registeredUserInfo.name,
        "",
        registeredUserInfo.password,
        messages.without_email
    );
  });

  it("Register User without entering 'Password'", () => {
    userEndPoint.verifyUserRegistersWithMissingOneParameter(
        registeredUserInfo.name,
        registeredUserInfo.email,
        "",
        messages.incomplete_password
    );
  });

  it("Register User without entering 'Username'", () => {
    userEndPoint.verifyUserRegistersWithMissingOneParameter(
        "",
        registeredUserInfo.email,
        registeredUserInfo.password,
        messages.incomplete_user_name
    );
  });
});
