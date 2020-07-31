import {galleryPage} from '../../page_object/gallery.page'
import {EMAIL} from '../../fixtures/constants'

const faker = require('faker')

let title = faker.name.title()
let description = faker.lorem.paragraph()
let imageUrl = 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg'
let wrongUrl = 'https://cdn.pixabay.com/photo/2015/02/'

describe ('Add image field on create gallery page', () => {

    beforeEach (() =>{
        cy.visit('/')
        cy.visit('/login')
        galleryPage.login(EMAIL.EXISTING,EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
        cy.visit('/create')
    })

    it ('GA-34 : Add image field ', () => {
        galleryPage.create(title, description, imageUrl)
        //     cy.wait(2000)
        //     cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    })

    it('GA-43 : Delete image ', () => {
        
    })

})