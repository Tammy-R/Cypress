import { galleryPage } from '../page_object/gallery.page';
import {EMAIL} from '../fixtures/constants';


const faker = require('faker')

let title = faker.name.title()
let imageUrl = 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg'
let secondUrl = 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'


describe ('Editovanje galerije', () => {

    beforeEach(()=>{
        cy.visit('/login')
        cy.loginBe(EMAIL.EXISTING,EMAIL.PASSWORD)
        cy.wait(2000)
    })

    it('Create gallery',()=>{
        cy.visit('/create')
        galleryPage.create(title,'',imageUrl)
    })

    it('Edit gallery', () => {
        
        cy.visit('/my-galleries')
        cy.get('.box-title').eq(0).click()
        // cy.url().should('contain','/1590')
        galleryPage.editGallery.click()
        galleryPage.addImageButton.click()
        galleryPage.secondImg.type(secondUrl)
        galleryPage.moveUp.click()
        galleryPage.image.should('have.value',secondUrl)
        galleryPage.secondImg.should('have.value',imageUrl)
        galleryPage.submitButton.click()
        
    })

    it(' Delete image ', () => {
        cy.visit('/my-galleries')
        cy.get('.box-title').eq(0).click()
        galleryPage.editGallery.click()
        galleryPage.trashButton.click()
        galleryPage.secondImg.should('not.exist')
    })

    it('Delete gallery',() =>{
        cy.visit('/my-galleries')
        cy.wait(2000)
    cy.get('.box-title').eq(0).click()
    galleryPage.deleteButton.click()
    cy.url().should('contain','galleries')
    } )
})