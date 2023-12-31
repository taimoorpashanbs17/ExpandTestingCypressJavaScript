/// <reference types="Cypress" />

class WelcomePage{
    navigate(){
        const path = "/app"
        cy.visit(path)
        cy.addContext("User Navigated to Welcome Screen")
    }

    verifyWelcomePageURL(path){
        const base = Cypress.config("baseUrl")
        const fullURL = base + path
        cy.verifyURL(fullURL)
        cy.addContext("User navigated to 'Welcome' Page.")
    }

    createNewAccountButton(){
        return cy.get('[data-testid="open-register-view"]').should("exist")
    }

    clickOnCreateNewAccountButton(){
        this.createNewAccountButton().click()
        cy.addContext("Clicked on 'Create an Account' button")
    }

    loginButton(){
        return cy.get('.btn-primary').should("exist")
    }

    clickOnLoginButton(){
        this.loginButton().click()
        cy.addContext("Clicked on 'Login' Button")
    }

}

module.exports = WelcomePage