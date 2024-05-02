const songElems = require('./songPageElements').SP_ELEMENTS;
const songFile = require('./songFilesParams').SF_PARAMS;


class handleSongs {

    addSongToPlaylist() {
        cy.get(songElems.emptyStateUploadedSongs).should('be.visible')

        cy.get(songElems.addSongButton).should('be.visible').then(() =>{
            cy.get(songElems.addSongButton).click()
            cy.get(songElems.selectSongtoUploadButton).should('be.visible')
        })

        cy.get(songElems.selectSongtoUploadButton).selectFile(songFile.songFilePath + songFile.songFileNameTesteFaq, { action: 'drag-drop' })

        // test purposes (force upload file error) Needed when testing a corrupted file
        // cy.get('input[type=file]', {force: true}).selectFile({
        //     contents: Cypress.Buffer.from('file contents'),
        //     fileName: songFile.songFilePath,
        //     fileName: songFile.songFileNameTesteFaq,
        //   },  {force: true})

        cy.get(songElems.submitUploadedSongStep1).should('be.visible').click()
        cy.get(songElems.songTrackSeparationTwoParts).should('be.visible').click()
        
        // intercept mutation requisition
        cy.intercept('POST', '/graphql', (req) => {
            if (req.body && req.body.query && req.body.query.includes('mutation')) {
                const keyValueToFind = req.body.query
                
                if (keyValueToFind.includes(songFile.songFileNameTesteFaq)){
                    expect(keyValueToFind).includes(songFile.songFileNameTesteFaq)
                }
              }
          })

        cy.get(songElems.submitUploadedSongStep2).should('be.visible').click()
        cy.get(songElems.songCounterFlag).contains('1 ')  // since it's a new user and there wasn't any music uploaded, then counter should show only 1 music
    }

    songSuccessfullyUploadedToPlaylist() {
        var songNameNoExtension = songFile.songFileNameTesteFaq.slice(0, -4)  // removing '.mp3' from FileName (songFileParams)

        cy.get(songElems.songTrackTitle)
            .should('be.visible')
            .contains(songNameNoExtension)
            .click()
        
    //     cy.intercept('POST', '/graphql', (req) => {
    //         req.reply((res) => {
 
    //         const responseData = res.body.data;
    //         console.log('my test:', responseData)
            
    //         // "input" value is not being filled - the song separation screen never finishes - input: ""
    //         // TODO: change the response from intercept to get the correct result
    //         const keyValueToFind = responseData.track.file.name  // change it later to get input value (cypress is not loading the page correctly, but doing outside cypress, it works)
 
    //         expect(keyValueToFind).to.equal(songNameNoExtension)})}).as('retRequest')
        
    //      cy.wait('@retRequest')
    }

    deleteSongFromPlaylist() {
        cy.get(songElems.songCounterFlag).should('be.visible')
        cy.get(songElems.editLibraryButton3Dots).click({force: true})
        cy.get(songElems.removeSongOption).click()
        cy.get(songElems.genericModalConfirmButton).click()
        cy.get(songElems.emptyStateUploadedSongs).should('be.visible')  // make sure the song was deleted from setlist
    }

    tryDeleteSongFromPlaylistNotOwner() {
        cy.get(songElems.publicPlaylistButton).should('be.visible').click()

        cy.get(songElems.genericModalDismissButton).click()
        
        cy.get(songElems.songTrackTitle).then(() =>{
            cy.get(songElems.editLibraryButton3Dots).should('not.exist')
        })
    }

    checkEmptySongsInSetlist() {
        cy.get(songElems.emptyStateUploadedSongs).should('be.visible')
    }

    hideCollectionDemoSongs() {
        cy.get(songElems.songTrackTitle, {force: true}).should('have.length.greaterThan', 1)
        cy.get(songElems.hideSongsIcon).should('be.visible').click()
        cy.get(songElems.genericModalConfirmButton).click()
        cy.get(songElems.songTrackTitle, {force: true}).should('have.length', 1)
    }
}


export default new handleSongs();