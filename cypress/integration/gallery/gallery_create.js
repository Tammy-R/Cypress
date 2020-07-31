import { galleryPage } from '../../page_object/gallery.page';
import { EMAIL } from '../../fixtures/constants';
const faker = require('faker')

let title = faker.name.title()
let description = faker.lorem.sentence()
let imageUrl = 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg'


describe ('GA-21 : Title field ', () => {

    beforeEach(() => {
        cy.visit('/login')
        galleryPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
    })

    // it('Create new gallery', () => {
    //     cy.visit('/create')
    //     cy.url().should('contain', 'create')
    //     galleryPage.create(title, description, imageUrl)
    //     cy.wait(2000)
    //     cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    // })

    it ('Create ten galleries', () => {
        cy.visit('/create')
        for (var i = 1; i <=10; i++) {
            galleryPage.create(title, description, imageUrl)
            cy.visit('/create')
        }

    })

    it ('Paginacija', () => {
        cy.visit('/my-galleries')
        cy.get('.grid').children().should('have.length', 10)
        cy.get('.btn').contains('Load More').should('not.exist')
        cy.visit('/create')
        galleryPage.create(title, description, imageUrl)
        cy.visit('/my-galleries')
        cy.get('.grid').children().should('have.length', 11)
        cy.get('.btn').contains('Load More').should('exist')

    })

    it.only ('Brisanje galerija', ()=>{
        // cy.visit('/my-galleries')
        // galleryPage.gallery.click()

        for(var i=0; i<=10; i++){
            cy.visit('/my-galleries')
            galleryPage.gallery.click()
            cy.wait(2000)
            galleryPage.deleteButton.click()
            

        }
    })
})