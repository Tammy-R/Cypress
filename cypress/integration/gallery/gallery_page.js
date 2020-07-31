import {galleryPage} from '../../page_object/gallery.page';
import {EMAIL} from '../../fixtures/constants';



describe ('Gallery page validation', () => {

    before (()=> {
        cy.visit('/login')
        galleryPage.login(EMAIL.EXISTING,EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
    })


    it('GA-12 : Create New Gallery Page validation', () => {
        cy.visit('/create')
        galleryPage.title.should('be.visible')
        galleryPage.description.should('be.visible')
        galleryPage.image.should('be.visible')
        // galleryPage.trashButton.should('be.visible')
        galleryPage.moveDown.should('be.visible')
        galleryPage.moveUp.should('be.visible')
        galleryPage.addImageButton.should('be.visible')
        galleryPage.submitButton.should('be.visible')
        galleryPage.cancelButton.should('be.visible')
    })
})