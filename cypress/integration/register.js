import {EMAIL} from '../fixtures/constants';
import { authPage } from '../page_object/login.page';
import { randomEmail } from '../utils';

const faker= require('faker');

let email= faker.internet.email();
let password = faker.internet.password();
let emailTwo = faker.internet.email();
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();





describe('Register module', () => {

    beforeEach (() => {
      cy.visit('/register')
    })
    before(() => {
      cy.server()
          cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('galleries')
    })
  
      it('GA-9 : Register page test ', () =>{
          cy.visit('/register')
          authPage.firstName.should('be.visible')
          authPage.lastName.should('be.visible')
          authPage.email.should('be.visible')
          authPage.password.should('be.visible')
          authPage.passConfirm.should('be.visible')
          cy.get('.form-check-label').contains('Accepted terms and conditions').should('be.visible')
          authPage.loginButton.should('be.visible')
                              .should('contains.text', 'bmi')  
      } )
  
      it('GA-14 : Register page positive test ', () => {
          cy.visit('/register')
          authPage.firstName.type(firstName)
          authPage.lastName.type(lastName)
          authPage.email.type(email)
          authPage.password.type(EMAIL.PASSWORD)
          authPage.passConfirm.type(EMAIL.PASSWORD)
          authPage.terms.click()
          authPage.loginButton.click()
          cy.server()
          cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('galleries')
          cy.wait('@galleries')
          cy.get(".nav-link").contains("Logout").should('be.visible')
      })
  
      it('GA-40 : Register page test - First name input field: required  ', () => {
          cy.visit('/register')
          authPage.firstName
          authPage.lastName.type(lastName)
          authPage.email.type(randomEmail())
          authPage.password.type(password)
          authPage.passConfirm.type(password)
          authPage.terms.click()    
          authPage.loginButton.click()
          authPage.firstName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
          })
          cy.get(".nav-link").contains("Register").should('be.visible')
      })
  
      it('GA-46 : Register page test - Last name input field: required ', () => {
          cy.visit('/register')
          authPage.firstName.type(firstName)
          authPage.lastName
          authPage.email.type(emailTwo)
          authPage.password.type(password)
          authPage.passConfirm.type(password)
          authPage.terms.click()  
          authPage.loginButton.click()
          authPage.lastName.then(($input) => {
              expect($input[0].validationMessage).to.eql('Please fill out this field.')
          })
          cy.get(".nav-link").contains("Register").should('be.visible')
      })
  
      it('GA-54 : Register page test - Email input field: required ', () => {
          cy.visit('/register')
          authPage.firstName.type(firstName)
          authPage.lastName.type(lastName)
          authPage.email
          authPage.password.type(password)
          authPage.passConfirm.type(password)
          authPage.terms.click()
          authPage.loginButton.click()
          authPage.email.then(($input) => {
              expect($input[0].validationMessage).to.eql('Please fill out this field.')
          })
          cy.get(".nav-link").contains("Register").should('be.visible')
      })
  
      it('GGA-55 : Register page test - Email field format invalid ', () => {
          cy.visit('/register')
          authPage.firstName.type(firstName)
          authPage.lastName.type(lastName)
          authPage.email.type('invalid@email')
          authPage.password.type(password)
          authPage.passConfirm.type(password)
          authPage.terms.click()
          authPage.loginButton.click()
          cy.get('.alert').contains('The email must be a valid email address').should('be.visible')
          cy.get(".nav-link").contains("Register").should('be.visible')
      })
  
      it('GA-59 : Register page test - Password input field empty ', () => {
          cy.visit('/register')
          authPage.firstName.type(firstName)
          authPage.lastName.type(lastName)
          authPage.email.type(emailTwo)
          authPage.password
          authPage.passConfirm.type(password)
          authPage.terms.click()
          authPage.password.then(($input) => {
            expect($input[0].validationMessage).to.eql('Please fill out this field.')
        })
        authPage.loginButton.click()
          cy.get(".nav-link").contains("Register").should('be.visible')
  })
  
    it('GA-60 : Register page test - Password Confirm input field empty', () => {
      cy.visit('/register')
      authPage.firstName.type(firstName)
      authPage.lastName.type(lastName)
      authPage.email.type(emailTwo)
      authPage.password.type(password)
      authPage.passConfirm
      authPage.terms.click()
      authPage.loginButton.click()
      authPage.passConfirm.then(($input) => {
        expect($input[0].validationMessage).to.eql('Please fill out this field.')
    })
      cy.get(".nav-link").contains("Register").should('be.visible')
    } )
  
    it('GA-81 : Confirmation password doesnt match', () => {
      cy.visit('/register')
      authPage.firstName.type(firstName)
      authPage.lastName.type(lastName)
      authPage.email.type(emailTwo)
      authPage.password.type(password)
      authPage.passConfirm.type('testtest3')
      authPage.terms.click()
      authPage.loginButton.click()
      cy.get('.alert').contains('The password confirmation does not match').should('be.visible')
                                                                           .should('contains.text', 'The password confirmation does not match.')
      cy.get(".nav-link").contains("Register").should('be.visible')
    })
  
    it('GA-82 : Password form - invalid',  () => {
      cy.visit('/register')
      authPage.firstName.type(firstName)
      authPage.lastName.type(lastName)
      authPage.email.type(emailTwo)
      authPage.password.type('password')
      authPage.passConfirm.type('password')
      authPage.terms.click()
      authPage.loginButton.click()
      cy.get('.alert').contains('The password format is invalid.').should('be.visible')
                                                                           .should('contains.text', 'The password format is invalid.')
      cy.get(".nav-link").contains("Register").should('be.visible')
    })
    
    it('GA-83 : Password form - password has less then 8 characters  ', () => {
      cy.visit('/register')
      authPage.firstName.type(firstName)
      authPage.lastName.type(lastName)
      authPage.email.type(emailTwo)
      authPage.password.type('pass2')
      authPage.passConfirm.type('pass2')
      authPage.terms.click()
      authPage.loginButton.click()
      cy.get('.alert').contains('The password must be at least 8 characters').should('be.visible')
                                                                           .should('contains.text', 'The password must be at least 8 characters.')
      cy.get(".nav-link").contains("Register").should('be.visible')
    } )
  
    it('GA-84 : User can not be registered twice', () => { 
          cy.visit('/register')
          authPage.firstName.type(firstName)
          authPage.lastName.type(lastName)
          authPage.email.type(EMAIL.EXISTING)
          authPage.password.type(EMAIL.PASSWORD)
          authPage.passConfirm.type(EMAIL.PASSWORD)
          authPage.terms.click()
          authPage.loginButton.click()
          cy.get('.alert').contains('The email has already been taken.').should('be.visible')
                                                                           .should('contains.text', 'The email has already been taken.')
          cy.get(".nav-link").contains("Register").should('be.visible')
  
    } )
  
  })