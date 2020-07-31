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
           cy.wait(2000)
            cy.url().should('eq', 'https://gallery-app.vivifyideas.com')
    })

    it('GA-43 : Delete image ', () => {
        galleryPage.image.type(imageUrl)
        galleryPage.addImageButton.click()
        galleryPage.secondImg.type(wrongUrl)
        galleryPage.trashButton.click()
        galleryPage.secondImg.should('not.exist')
    })

    it('GA-70 : Add image - blank url ', () => {
        galleryPage.create(title,'','')
        cy.url().should('contain','create')
        galleryPage.image.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.') })
    })

    it('GA-71 : Add image - wrong url ', () => {
        galleryPage.create(title,'',wrongUrl)
        cy.url().should('contain','create')
    })

    it.only('GA-50 : buttons Move up / down for url ', () => {
        galleryPage.image.type(imageUrl)
        galleryPage.addImageButton.click()
        galleryPage.secondImg.type(wrongUrl)
        galleryPage.moveUp.click()
        galleryPage.image.should('have.value',wrongUrl)
        galleryPage.secondImg.should('have.value',imageUrl)
        galleryPage.moveUp.click()
        galleryPage.image.should('have.value',imageUrl)
        galleryPage.secondImg.should('have.value',wrongUrl)
    })

    it('GA-56 : Cancel button ', ()=> {
        galleryPage.cancelButton.click()
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com')
    })

})