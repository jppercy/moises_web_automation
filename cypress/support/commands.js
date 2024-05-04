// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const loginCredentialFilePath = './cypress/support/loginCredentials.json'

// creating a unique login so any spec can use it
Cypress.Commands.add('createRandomUserEmail', (email) => {
    const getDateNow = Date.now().toString()
    const getUniqueID = Cypress._.uniqueId()

    const login = {
        email: Date.now().toString() + getUniqueID + '@qatest.com',
        password: 'fakepassword'
     }

    cy.writeFile(loginCredentialFilePath, login)

})

