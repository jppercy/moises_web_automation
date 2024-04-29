import login from '../support/pages/login'
import handleSongs from '../support/pages/songsPlaylist'


context('handle songs in setlist', () => {
  beforeEach(() => {
    login.accessMoisesMainPage()
  })

  it('login credentials are filled up', () => {
    login.logIntoMoisesUsingCredentials()
  })

  it('add a song file to setlist', () => {
    handleSongs.addSongToPlaylist()
  })

  it('confirm the song was added correctly to setlist', () => {
    handleSongs.songSuccessfullyUploadedToPlaylist()
  })

  it('hide moises collection demo songs', () => {
    handleSongs.hideCollectionDemoSongs()
  })

  it('delete a song previously added in setlist', () => {
    handleSongs.deleteSongFromPlaylist()
  })

  it('setlist must be empty', () => {
    handleSongs.checkEmptySongsInSetlist()
  })

  it('fail on deleting song when user is not the owner', () => {
    handleSongs.tryDeleteSongFromPlaylistNotOwner()
  })

})






