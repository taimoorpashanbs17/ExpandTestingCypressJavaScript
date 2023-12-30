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

describe("Notes - User Login API", () => {
  it("Login User with Valid Credentials", () => {
    userEndPoint.verifyUserLoginSuccessFully(
      registeredUserInfo.email,
      registeredUserInfo.password,
      registeredUserInfo.name
    );
  });

  it("Login User with InValid Credentials - i.e. Invalid Email or Password", () => {
    userEndPoint.verifyUserLoginWithInvalidEmailOrPassword(
      "taimoor_test122@gmail.com",
      registeredUserInfo.password
    );
  });

  it("Login User without One Parameter - i.e. Email", () => {
    userEndPoint.verifyUserLoginWithoutEmailOrPassword(
      "",
      registeredUserInfo.password,
      messages.without_email
    );
  });

  it("Login User without One Parameter - i.e. Password", () => {
    userEndPoint.verifyUserLoginWithoutEmailOrPassword(
      registeredUserInfo.email,
      "",
      messages.incomplete_password
    );
  });
});
