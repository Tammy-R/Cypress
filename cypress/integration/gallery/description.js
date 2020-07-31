import {galleryPage} from '../../page_object/gallery.page'
import {EMAIL} from '../../fixtures/constants'

const faker = require('faker')

let title = faker.name.title()
let description = faker.lorem.paragraph()
let imageUrl = 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg'
let longDescr = description.padEnd(1001,'b')

describe ('Description field on create gallery page', () =>{

    beforeEach (() =>{
        cy.visit('/')
        cy.visit('/login')
        galleryPage.login(EMAIL.EXISTING,EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
        cy.visit('/create')
    })

    it.only('GA-27 : Description field ', () => {
        galleryPage.create(title, description,imageUrl)
        expect(description).to.have.length.of.at.most(1000)


    })

    it ('GA-68 : Description - more than 1000 caracters', () => {
        galleryPage.create(title,longDescr,imageUrl)
        galleryPage.alert.should('contain','The description may not be greater than 1000 characters.')
        cy.url().should('contain','create')
    } )

    it.only ('GA-66 : Description - blank field', () => {
       galleryPage.create(title, '', imageUrl)
        cy.url().should('contain','gallery')
    })
})