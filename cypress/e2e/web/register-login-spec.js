/// <reference types="Cypress" />

import WelcomePage from "../../pages/welcomePage";
import RegisterUserPage from "../../pages/registerUserPage";
import LoginUserPage from "../../pages/loginUserPage";
import HomePage from "../../pages/homePage";

let { createRandomEmailAddress } = require("../../utils/random-util");

const welcomePage = new WelcomePage();
const registerUserPage = new RegisterUserPage();
const loginUserPage = new LoginUserPage();
const homePage = new HomePage();


let userInformation;
let webMessages;
let webPages;

const newEmail = createRandomEmailAddress()

beforeEach(() => {
  cy.fixture("user_information_web").then((data) => {
    userInformation = data;
  });
  cy.fixture("web_messages").then((data) => {
    webMessages = data;
  });
  cy.fixture("web_pages_path").then((data) => {
    webPages = data;
  })
  welcomePage.navigate();
});

describe("Notes - Register User Web", () => {
  it("Register User with Email and Password and then login it", () => {
    welcomePage.clickOnCreateNewAccountButton();
    registerUserPage.enterEmailOnEmailAddressField(newEmail);
    registerUserPage.enterNameOnNameField(userInformation.name);
    registerUserPage.enterPasswordOnPasswordField(userInformation.password);
    registerUserPage.enterPasswordOnConfirmPasswordField(
      userInformation.password
    );
    registerUserPage.clickOnRegisterButton();
    registerUserPage.verifyTextOnUserAccountStatus(webMessages.user_registered);
    registerUserPage.clickOnClickHereToLoginLink()
    loginUserPage.verifyLoginURL(webPages.login_page)
    loginUserPage.enterEmailOnEmailLoginField(newEmail)
    loginUserPage.enterPasswordOnPasswordLoginField(userInformation.password)
    loginUserPage.clickOnLoginButton()
    homePage.verifyHomePageURL(webPages.home_page)
    homePage.clickOnLogoutButton()
    welcomePage.verifyWelcomePageURL(webPages.home_page)
  });


  it("Register User with Existing Email", () => {
    welcomePage.clickOnCreateNewAccountButton();
    registerUserPage.enterEmailOnEmailAddressField(userInformation.email);
    registerUserPage.enterNameOnNameField(userInformation.name);
    registerUserPage.enterPasswordOnPasswordField(userInformation.password);
    registerUserPage.enterPasswordOnConfirmPasswordField(
      userInformation.password
    );
    registerUserPage.clickOnRegisterButton();
    registerUserPage.verifyTextOnAlertBannerMessage(webMessages.already_exist_user)
  });
});


describe("Notes - Login User Web", () => {
  it("Login with Valid credentials and Logout", () => {
    welcomePage.clickOnLoginButton()
    loginUserPage.verifyLoginTitleDisplaying()
    loginUserPage.enterEmailOnEmailLoginField(userInformation.email)
    loginUserPage.enterPasswordOnPasswordLoginField(userInformation.password)
    loginUserPage.clickOnLoginButton()
    homePage.verifyHomePageURL(webPages.home_page)
    homePage.clickOnLogoutButton()
    welcomePage.verifyWelcomePageURL(webPages.home_page)
  })

  it("Login with InValid credentials", () => {
    welcomePage.clickOnLoginButton()
    loginUserPage.verifyLoginTitleDisplaying()
    loginUserPage.enterEmailOnEmailLoginField(createRandomEmailAddress())
    loginUserPage.enterPasswordOnPasswordLoginField(userInformation.password)
    loginUserPage.clickOnLoginButton()
    loginUserPage.alertMessage()
    loginUserPage.getAlertMessage(webMessages.incorrect_information)
  })
})
