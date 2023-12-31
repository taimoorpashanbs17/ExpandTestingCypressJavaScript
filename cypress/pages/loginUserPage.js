class LoginUserPage{

    verifyLoginURL(path){
        const base = Cypress.config("baseUrl")
        const fullURL = base + path
        cy.verifyURL(fullURL)
        cy.addContext("User navigated to 'Login' Page.")
    }

    verifyLoginTitleDisplaying(){
        cy.get('h1').should("exist")
        cy.addContext("'Login' header is displaying")
    }

    loginEmailField(){
        return cy.get('[data-testid="login-email"]').should("exist")
    }

    enterEmailOnEmailLoginField(email){
        this.loginEmailField().type(email)
        cy.addContext(email+" entered within 'Email' field.")
    }

    loginPasswordField(){
        return cy.get('[data-testid="login-password"]').should("exist")
    }

    enterPasswordOnPasswordLoginField(password){
        this.loginPasswordField().type(password)
        cy.addContext(password+" entered within 'Password' field.")
    }

    loginButton(){
        return cy.get('[data-testid="login-submit"]').should("exist")
    }

    clickOnLoginButton(){
        this.loginButton().click()
        cy.addContext("Clicked on 'Login' Button.")
    }

    alertMessage(){
        return cy.get('[data-testid="alert-message"]').should("exist")
    }

    getAlertMessage(message){
     cy.verifyText(this.alertMessage(), message)
     cy.addContext(message+" is displaying")
    }

}

module.exports = LoginUserPage