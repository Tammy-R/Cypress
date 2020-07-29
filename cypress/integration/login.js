import { EMAIL } from '../fixtures/constants';
import { authPage } from '../page_object/login.page';
import { randomEmail } from '../utils';

const faker = require('faker');

let email = faker.internet.email();
let password = faker.internet.password();
let emailTwo = faker.internet.email();
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();

describe('Login module', () => {

  beforeEach(() => {
    cy.visit('/')

  })

  it('GA-19 : Login page layout ', () => {
    cy.get(".nav-link").contains("Login").should('be.visible')
    authPage.email.should('be.visible')
    authPage.password.should('be.visible')
    authPage.loginButton.should('be.visible')
  })

  it('GA-28 : Login - valid data', () => {
    cy.get(".nav-link").contains("Login").click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
    cy.wait('@galleries')
    cy.get(".nav-link").contains("Logout").should('be.visible')
  })


  it('GA-22 : Login - invalid data - username ', () => {
    cy.get(".nav-link").contains("Login").click()
    authPage.login('test', EMAIL.PASSWORD)
    authPage.email.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.')
    })

  })

  it('Login - invalid data - incomplete email ', () => {
    cy.get(".nav-link").contains("Login").click()
    authPage.login('ruzictam@', EMAIL.PASSWORD)
    authPage.email.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please enter a part following \'@\'. \'ruzictam@\' is incomplete.')
    })

  })

  it('Login - invalid data - empty username ', () => {
    cy.get(".nav-link").contains("Login").click()
    authPage.login('', EMAIL.PASSWORD);
    authPage.email.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })



  it('GA-23 : Login - invalid data - password ', () => {
    cy.get(".nav-link").contains("Login").click()
    authPage.login(EMAIL.EXISTING, password)
    cy.get(".alert").should('be.visible')
      .should('have.text', 'Bad Credentials')
      .should('have.class', 'alert')
  })

  it('GA-23 : Login - invalid data - empty password ', () => {
    cy.get(".nav-link").contains("Login").click()
    authPage.login(EMAIL.EXISTING, '')
    cy.get('#password').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })

})



