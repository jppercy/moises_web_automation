import login from '../support/pages/login/loginHandler'
import handleSongs from '../support/pages/songsPlaylist'


context('handle songs in setlist', () => {
  beforeEach(() => {
    // tried each one and none worked
    // Cypress.session.clearAllSavedSessions()
    // Cypress.session.clearCurrentSessionData()
    // cy.clearAllSessionStorage()
    // cy.clearLocalStorage()
    // cy.clearCookies()

    // this one worked like a charm
    indexedDB.deleteDatabase('firebaseLocalStorageDb')

    cy.createRandomUserEmail()
    cy.accessMoisesMainPage()
    cy.signupIntoMoises()
  })

   it('add a song file to setlist', () => {
    cy.addSongToPlaylist()
  })

  it('confirm the song was added correctly to setlist', () => {
    cy.addSongToPlaylist()
    cy.songSuccessfullyUploadedToPlaylist()
  })

  it('hide moises collection demo songs', () => {
    cy.hideCollectionDemoSongs()
  })

  it('delete a song previously added in setlist', () => {
    cy.addSongToPlaylist()
    cy.deleteSongFromPlaylist()
  })

  it('setlist must be empty', () => {
    cy.addSongToPlaylist()
    cy.deleteSongFromPlaylist()
    cy.checkEmptySongsInSetlist()
  })

  // it('fail on deleting song when user is not the owner', () => {
  //   handleSongs.tryDeleteSongFromPlaylistNotOwner()  // flaky test, since we need to know the rules to Modal appears
  // })

})






