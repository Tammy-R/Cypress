const faker= require('faker');

let email= faker.internet.email();
let password = faker.internet.password();

describe('Login module', () => {
    it('GA-19 : Login page layout ', () => {
        cy.visit('/') 
        cy.get(".nav-link").contains("Login").should('be.visible')
        cy.get('form > nth:child(1)').should('be.visible')
        cy.get('[type=password]').should('be.visible')
        cy.get("[type=submit]").contains("Submit").should('be.visible')
    })
  })

  it('GA-28 : Login - valid data', () => {
    cy.visit('/') 
    cy.get(".nav-link").contains("Login").click()
    cy.get('#email').type('ruzictam@gmail.com')
    cy.get('#password').type('0637379360')
    cy.get("[type=submit]").contains("Submit").click()
    cy.wait(1000)
    cy.get(".nav-link").contains("Logout").should('be.visible')
    })


    it('GA-22 : Login - invalid data - username ', () => {
cy.visit('/') 
cy.get(".nav-link").contains("Login").click()
cy.get('#email').type(email)
cy.get('#password').type('0637379360')
cy.get("[type=submit]").contains("Submit").click()
cy.get(".alert").contains("Bad Credentials").should('be.visible')
})


  
    it('GA-23 : Login - invalid data - password ', () => {
cy.visit('/') 
cy.get(".nav-link").contains("Login").click()
cy.get('#email').type('ruzictam@gmail.com')
cy.get('#password').type(password)
cy.get("[type=submit]").contains("Submit").click()
cy.get(".alert").should('be.visible')
                .should('have.text', 'Bad Credentials')
                .should('have.class', 'alert')
})
  