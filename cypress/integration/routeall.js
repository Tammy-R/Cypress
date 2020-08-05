import {EMAIL} from '../fixtures/constants.js'


//presreli smo request i poslali podatke iz jsona

describe('Route all', () => {

    beforeEach(() => {
        cy.server()
        cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=').as('stubing')
    })

    it('Wait for request to load', () => {
        //request >> umesto da koristimo postman to mozemo da testiramo i u cypressu
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)

        //sve ovo ispod smo spakovali u novu cy.komandu
        // cy.request('POST', Cypress.env('apiUrl') + '/auth/login',
        //     { "email": "ruzictam@gmail.com", "password": "0637379360" }).then((resp) => {
        //         expect(resp.body).to.have.property('access_token')
        //         localStorage.setItem('token', resp.body.acces_token)
             
        //     })
        // cy.visit('/')

        cy.wait('@stubing')
        cy.get('@stubing').
        //its('response').then((resp)=>{
            // cy.log(resp.body.galleries[0].id)
            //brisanje galerije iz bekenda
            cy.request({
                method: 'DELETE',
                url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[0].id,
                form: true,
                followRedirect: true,
                headers: {
                    authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
            })
        })
    })

})
