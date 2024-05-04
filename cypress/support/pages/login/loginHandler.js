const elems = require('./elements').ELEMENTS


const loginCredentialFilePath = './cypress/support/loginCredentials.json'


// Cypress.Commands.add('createRandomUserEmail', (email) => {
//     const getDateNow = Date.now().toString()
//     const getUniqueID = Cypress._.uniqueId()

//     const login = {
//         email: Date.now().toString() + getUniqueID + '@qatest.com',
//         password: 'fakepassword'
//      }

//     cy.writeFile(loginCredentialFilePath, login)

// })


Cypress.Commands.add('accessLoginPage', () => {
    cy.visit(Cypress.env('moisesHomePage'))
    cy.get(elems.username).should('be.visible').should('be.enabled')
})


Cypress.Commands.add('accessMoisesMainPage', () => {
    cy.visit(Cypress.env('moisesHomePage'))
})


Cypress.Commands.add('signupIntoMoises', () => {
    cy.get(elems.signupButton)
            .should('be.visible')
            .should('be.enabled')

        cy.get(elems.signupButton).click()  // removing chain because sometimes page gets re-rendered and test fails
        
        cy.get(elems.termsLink).should('be.visible')  // confirmins we're on signup screen

        cy.get(elems.username).should('be.visible').then(() => {
            cy.get(elems.username).click()
        })

        cy.readFile(loginCredentialFilePath).then((jsonContent) => {
            cy.get(elems.username).type(jsonContent.email)
            cy.get(elems.createPasswordField).click().type(jsonContent.password)
        })

        cy.get(elems.signupButtonSignupScreen).click()
        cy.get(elems.firstTimeUserLoginEmptySetlist).should('be.visible')
})


Cypress.Commands.add('logIntoMoisesUsingCredentials', () => {
    cy.get(elems.username)
    .should('be.visible')
    .should('be.enabled')

    cy.get(elems.username).click()  // removing chain because in cypress run mode, its not clicking
        
    cy.readAndTypeLoginCredentials()

    cy.get(elems.loginButton).click()
    cy.get(elems.firstTimeUserLoginEmptySetlist).should('be.visible')
})


Cypress.Commands.add('wrongCredentialsMessage', () => {
    cy.get(elems.username).should('be.visible').should('be.enabled')

    cy.readAndTypeLoginCredentials()

    cy.get(elems.loginButton).click()
    cy.get(elems.credentialsFailMessageClass).should('be.visible')

})


Cypress.Commands.add('wrongEmailError', () => {
    cy.get(elems.username).should('be.visible').should('be.enabled')

    cy.get(elems.username).type('fakeemail.fakeemail.com')
    cy.get(elems.password).click().type('fakepassword')

    cy.get(elems.loginButton).click()
    cy.get(elems.credentialsFailMessageClass).should('be.visible')
})


Cypress.Commands.add('logoutApplication', () => {
    cy.visit(Cypress.env('moisesHomePage')) 
    cy.get(elems.userInfoSignOutButton).should('be.visible').click()
    cy.get(elems.signOutButton).click()
    cy.get(elems.username).should('be.visible').should('be.enabled')
})


// read json file under ./cypress/support/loginCredentials.json and type info into fields
Cypress.Commands.add('readAndTypeLoginCredentials', () => {
    cy.readFile(loginCredentialFilePath).then((jsonContent) => {
        cy.get(elems.username).type(jsonContent.email)
        cy.get(elems.password).click().type('fakepassword')
    })
})