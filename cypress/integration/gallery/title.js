import {galleryPage} from '../../page_object/gallery.page'
import {EMAIL} from '../../fixtures/constants'

const faker = require('faker')

let title = faker.name.title()
let description = faker.lorem.sentence()
let imageUrl = 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg'
let longTitle = title.padEnd(256,'b')

describe ('Create gallery - title field', () => {

    beforeEach (() =>{
        cy.visit('/')
        cy.visit('/login')
        galleryPage.login(EMAIL.EXISTING,EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
        cy.visit('/create')
    })

    // it ('GA-21 : Title field ', () =>{
    //     galleryPage.create(title, description,imageUrl)
    //     expect(title).to.have.length.of.at.most(255)
    // })

    it ('GA-63 : Title field - blank', () =>{
        galleryPage.create('', description,imageUrl)
        galleryPage.title.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.') })
    })

    it('GA-64 : Title field - 1 caracter', ()=> {
        galleryPage.create('a', description,imageUrl)
        // galleryPage.title.then(($input) => {
        //     expect($input[0].validationMessage).to.eq('Title should contains at least two caracters.') })
        cy.url().should('contain','create')
    })

    it.only('GA-65 : Title field - more than 255 caracters',() => {
        galleryPage.create(longTitle, description,imageUrl)
        galleryPage.alert.should('contain','The title may not be greater than 255 characters.')
        cy.url().should('contain','create')
    })

})