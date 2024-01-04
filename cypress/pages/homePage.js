/// <reference types="cypress" />


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

    allTabButton(){
        return cy.get('[data-testid="category-all"]').should("exist")
    }

    clickOnAllTabButton(){
        cy.wait(2000)
        this.allTabButton().click()
        cy.addContext("'All' Tab is displaying")
    }

    noNotesText(){
        return cy.get('[data-testid="no-notes-message"]').should("exist")
    }

    verifyNoNotesText(text){
        cy.verifyText(this.noNotesText(), text)
        cy.addContext(text+" is displaying at Page")
    }

    homeTabButton(){
        return cy.get('[data-testid="category-home"]').should("exist")
    }

    clickOnHomeTabButton(){
        this.homeTabButton().click()
        cy.addContext("Clicked on 'Home' Tab of Notes")
    }

    workTabButton(){
        return cy.get('[data-testid="category-work"]').should("exist")
    }

    clickOnWorkTabButton(){
        this.workTabButton().click()
        cy.addContext("Clicked on 'Work' Tab Button of Notes")
    }

    personalTabButton(){
        return cy.get('[data-testid="category-personal"]').should("exist")
    }

    clickOnPersonalTabButton(){
        this.personalTabButton().click()
        cy.addContext("Clicked on 'Personal' Tab of Notes")
    }

    addNoteButton(){
        return cy.get('[data-testid="add-new-note"]').should("exist")
    }

    clickOnAddNoteButton(){
        this.addNoteButton().click()
        cy.addContext("Clicked on 'Add Note' button")
    }

    categoryDropDrop(){
        return cy.get('[data-testid="note-category"]').should("exist")
    }

    selectCategoryFromDropDown(category){
        this.categoryDropDrop().select(category)
        cy.addContext(category+ " category selected from Drop down")
    }

    titleTextField(){
        return cy.get('[data-testid="note-title"]').should("exist")
    }

    enterTitleOnTitleTextField(title){
        this.titleTextField().type(title)
        cy.addContext(title+" added on 'Title' field.")
    }

    textDescriptionField(){
        return cy.get('[data-testid="note-description"]').should("exist")
    }

    enterTextOnDescriptionField(description){
        this.textDescriptionField().type(description)
        cy.addContext(description+" entered within 'Description' field.")
    }

    createButton(){
        return cy.get('[data-testid="note-submit"]').should("exist")
    }

    clickOnCreateButton(){
        this.createButton().click()
        cy.wait(2000)
        cy.addContext("Clicked on 'Create' button")
    }

    progressBarText(){
        return cy.get('[data-testid="progress-info"]').should("exist")
    }

    getProgressBarText(text){
        cy.verifyText(this.progressBarText(), text)
        cy.addContext(text+ " is displaying")
    }

    createdNoteTitle(){
        return cy.get('[data-testid="note-card-title"]').should("exist")
    }

    getCreatedNoteText(text){
        cy.verifyText(this.createdNoteTitle(), text)
        cy.addContext(text+" is displaying at created 'Note'.")
    }

    completeToggle(){
        return cy.get('[data-testid="toggle-note-switch"]').should("exist")
    }

    unCheckCompleteToggle(){
        this.completeToggle().uncheck()
        cy.addContext("Unchecked on 'Complete' button")
    }

    clickOnCompleteToggle(){
        this.completeToggle().check()
        cy.addContext("Clicked on Complete Toggle")
    }

    verifyCompleteToggleChecked(){
        this.completeToggle().should("be.checked")
        cy.addContext("Complete Toggle Button is checked")
    }

    verifyCompleteToggleNotChecked(){
        this.completeToggle().should("not.be.checked")
        cy.addContext("Complete Toggle Button is not checked")
    }

    createdCardTitle(){
        return cy.get('[data-testid="note-card-title"]').should("exist")
    }

    verifyCreatedCardTitle(text){
        cy.verifyText(this.createdCardTitle(), text)
        cy.addContext(text+" is displaying at 'Created Note' Card's Title")
    }

    verifyCreatedCardBackgroundColorAfterMarkingComplete(backGroundColor){
        cy.wait(2000)
        cy.get('[data-testid="note-card-title"]').invoke('attr', 'style').should('equal', backGroundColor)
    }

    verifyCreatedCardBackgroundColorAfterMarkingInComplete(){
        cy.wait(2000)
        cy.get('[data-testid="note-card-title"]').invoke('attr', 'style').should('equal', 'background-color: rgb(255, 145, 0); color: rgb(255, 255, 255);')
    }

    createdCardDescription(){
        return cy.get('[data-testid="note-card-description"]').should("exist")
    }

    verifyCreatedCardDescription(description){
        cy.verifyText(this.createdCardDescription(), description)
        cy.addContext(description+" is displaying at 'Created Note' Card's Description")
    }

    completedCheckBox(){
        return cy.get('[data-testid="note-completed"]').should("exist")
    }

    checkOnCompleteCheckBox(){
        this.completedCheckBox().check()
        cy.addContext("Checked on 'Complete' Checkbox")
    }

}

module.exports = HomePage