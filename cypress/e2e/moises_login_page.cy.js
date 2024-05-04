
import login from '../support/pages/login/loginHandler'

describe('validate accesses into moises login page', () => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')

  it('create random email to use during the tests', () => {
    cy.createRandomUserEmail()
  })

  beforeEach(() => {
    cy.accessLoginPage()
  })

  it('wrong login credentials are filled up', () => {
    cy.wrongCredentialsMessage()
  })

  it('wrong email error message - no domain', () => {
    cy.wrongEmailError()
  })

  it('create a new account into moises', () => {
    cy.accessMoisesMainPage()
    cy.signupIntoMoises()
  })
})

describe('validate accesses into moises login page', () => {
  it('logout moises app', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')

    cy.createRandomUserEmail()
    cy.accessMoisesMainPage()
    cy.signupIntoMoises()
    cy.logoutApplication()
  })
})
