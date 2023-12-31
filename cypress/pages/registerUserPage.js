/// <reference types="Cypress" />

class RegisterUserPage{

    emailAddressField(){
        return cy.get('[data-testid="register-email"]').should("exist")
    }

    enterEmailOnEmailAddressField(emailAddress){
        this.emailAddressField().type(emailAddress)
        cy.addContext(emailAddress+" has entered within 'Email Address' Field")
    }

    passwordField(){
        return cy.get('[data-testid="register-password"]').should("exist")
    }

    enterPasswordOnPasswordField(password){
        this.passwordField().type(password)
        cy.addContext(password+" has entered within 'Password' Field")
    }

    nameField(){
        return cy.get('[data-testid="register-name"]').should("exist")
    }

    enterNameOnNameField(name){
        this.nameField().type(name)
        cy.addContext(name+" has entered within 'Name' Field")
    }

    confirmPasswordField(){
        return cy.get('[data-testid="register-confirm-password"]').should("exist")
    }

    enterPasswordOnConfirmPasswordField(password){
        this.confirmPasswordField().type(password)
        cy.addContext(password+" has entered within 'Confirm Password' Field")
    }

    registerButton(){
        return cy.get('[data-testid="register-submit"]').should("exist")
    }

    clickOnRegisterButton(){
        this.registerButton().click()
        cy.addContext("Clicked on 'Register' button")
    }

    userAccountStatusBanner(){
        return cy.get('b').should("exist")
    }

    verifyTextOnUserAccountStatus(text){
        cy.verifyText(this.userAccountStatusBanner(), text)
        cy.addContext(text+" is displaying at Page.")
    }

    alerBannertMessage(){
        return cy.get('[data-testid="alert-message"]').should("exist")
    }

    verifyTextOnAlertBannerMessage(text){
        cy.verifyText(this.alerBannertMessage(), text)
        cy.addContext(text+" is displaying at Page.")
    }

    clickHereToLoginLink(){
        return cy.get('[data-testid="login-view"]').should("exist")
    }

    clickOnClickHereToLoginLink(){
        this.clickHereToLoginLink().click()
        cy.addContext("Clicked on 'Click here to Login' link")
    }

}

module.exports = RegisterUserPage