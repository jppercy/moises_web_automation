const elems = require('./elements').ELEMENTS;


const loginCredentialFilePath = './cypress/support/loginCredentials.json'

class login{

    createRandomUserEmail() {
        const getDateNow = Date.now().toString();
        const getUniqueID = Cypress._.uniqueId()
        cy.writeFile(loginCredentialFilePath, {loginCredentials: Date.now().toString() + getUniqueID + '@qatest.com'})
    }

    accessLoginPage() {
        cy.visit(Cypress.env('moisesHomePage'))
        cy.get(elems.username).should('be.visible').should('be.enabled')
    }

    accessMoisesMainPage() {
        cy.visit(Cypress.env('moisesHomePage'))
        // cy.visit(moisesHomePage)  
    }

    signupIntoMoises() {
        cy.get(elems.signupButton)
            .should('be.visible')
            .should('be.enabled')

        cy.get(elems.signupButton).click()  // removing chain because sometimes page gets re-rendered and test fails
        
        cy.get(elems.termsLink).should('be.visible')  // confirmins we're on signup screen

        cy.get(elems.username).should('be.visible').then(() => {
            cy.get(elems.username).click()
        })

        cy.readFile(loginCredentialFilePath).then((login) => {
            cy.get(elems.username).type(login.loginCredentials)
        })

        cy.get(elems.createPasswordField).click().type('fakepassword')
        cy.get(elems.signupButtonSignupScreen).click()
        cy.get(elems.firstTimeUserLoginEmptySetlist).should('be.visible')
    }

    logIntoMoisesUsingCredentials() {
        cy.get(elems.username)
            .should('be.visible')
            .should('be.enabled')
        
        cy.get(elems.username).click()  // removing chain because in cypress run mode, its not clicking
            
        cy.readFile(loginCredentialFilePath).then((login) => {
            cy.get(elems.username).type(login.loginCredentials)
        })

        cy.get(elems.password).click().type('fakepassword')
        cy.get(elems.loginButton).click()
        cy.get(elems.firstTimeUserLoginEmptySetlist).should('be.visible')
    }
	
	wrongCredentialsMessage() {
        cy.get(elems.username).should('be.visible').should('be.enabled')

        cy.readFile(loginCredentialFilePath).then((login) => {
            cy.get(elems.username).type(login.loginCredentials)
        })
 
        cy.get(elems.password).click().type('fakepassword')
        cy.get(elems.loginButton).click()
        cy.get(elems.credentialsFailMessageClass).should('be.visible')
    }

    wrongEmailError() {
        cy.get(elems.username).should('be.visible').should('be.enabled')

        cy.readFile(loginCredentialFilePath).then((login) => {
            cy.get(elems.username).type('fakeemail.fakeemail.com')
        })
 
        cy.get(elems.password).click().type('fakepassword')
        cy.get(elems.loginButton).click()
        cy.get(elems.credentialsFailMessageClass).should('be.visible')
    }

    logoutApplication() {
        cy.visit(Cypress.env('moisesHomePage')) 
        cy.get(elems.userInfoSignOutButton).should('be.visible').click()
        cy.get(elems.signOutButton).click()
        cy.get(elems.username).should('be.visible').should('be.enabled')
    }
}

export default new login();