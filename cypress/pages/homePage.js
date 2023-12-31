class HomePage{

    verifyHomePageURL(path){
        const base = Cypress.config("baseUrl")
        const fullURL = base + path
        cy.verifyURL(fullURL)
        cy.addContext("User navigated to 'Home' Page.")
    }

    logoutButton(){
        return cy.get('[data-testid="logout"]').should("exist")
    }

    clickOnLogoutButton(){
        this.logoutButton().click()
        cy.addContext("Clicked on 'Logout' button")
    }

}

module.exports = HomePage