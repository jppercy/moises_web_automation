
import login from '../support/pages/login'

describe('validate accesses into moises login page', () => {

  it('create random email to use during the tests', () => {
    login.createRandomUserEmail()
  })

  beforeEach(() => {
    login.accessLoginPage()
  })

  it('wrong login credentials are filled up', () => {
    login.wrongCredentialsMessage()
  })

  it('wrong email error message - no domain', () => {
    login.wrongEmailError()
  })

  it('create a new account into moises', () => {
    login.signupIntoMoises()
  })

})

describe('logout moises application', () => {
  // thinking about isolation between suites, we'll logout and make a new login in the next test scenario
  it('logout moises app', () => {
    login.logoutApplication()
  })
})
