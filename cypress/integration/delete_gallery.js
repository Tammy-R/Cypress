import { EMAIL } from '../fixtures/constants.js'
import { galleryPage } from '../page_object/gallery.page';

describe('Brisanje galerija', () => {

    beforeEach(() => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
    })


    beforeEach(() => {
        cy.server()
        cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term=').as('galerija')

    })


    it('Create ten galleries', () => {
        cy.visit('/create')
        for (var i = 1; i <= 10; i++) {
            galleryPage.create('title', '', 'https://image.shutterstock.com/image-photo/butterfly-grass-on-meadow-night-260nw-1111729556.jpg')
            cy.visit('/create')
        }

    })

    it.only('Brisanje', () => {
        cy.visit('/my-galleries')
        cy.wait('@galerija')
        cy.get('@galerija').
            its('response').then((resp) => {
                cy.log(resp)
                for (var i = 0; i <= 0; i++) {  // i mora da bude <= od broja galerija koji su na stranici, inace puca test
                    let useCaseID = resp.body.galleries[i].id
                    // cy.request({
                    //     method: 'DELETE',
                    //     url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[i].id,
                    //     form: true,
                    //     followRedirect: true,
                    //     headers: {
                    //         authorization: `Bearer ${window.localStorage.getItem('token')}`
                    //     },
                    // })
                    cy.deleteBe(useCaseID)
                }
            }
            )


    })

})