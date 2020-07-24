const faker= require('faker');

let email= faker.internet.email();
let password = faker.internet.password();
let emailTwo = faker.internet.email();
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();


describe('Login module', () => {
    it('GA-19 : Login page layout ', () => {
        cy.visit('/login') 
        cy.get(".nav-link").contains("Login").should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get("[type=submit]").contains("Submit").should('be.visible')
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
  })

  

describe('Register module', () => {
    it('GA-9 : Register page test ', () =>{
        cy.visit('/register')
        cy.get('#first-name').should('be.visible')
        cy.get('#last-name').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#password-confirmation').should('be.visible')
        cy.get('.form-check-label').contains('Accepted terms and conditions').should('be.visible')
        cy.get('[type=submit]').contains('Submit').should('be.visible')
                                                  .should('contains.text', 'bmi')  
    } )

    it('GA-14 : Register page positive test ', () => {
        cy.visit('/register')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('.form-check-input').click()
        cy.get('[type=submit]').contains('Submit').click()
        cy.wait(1000)
        cy.get(".nav-link").contains("Logout").should('be.visible')
    })

    it('GA-40 : Register page test - First name input field: required  ', () => {
        cy.visit('/register')
        cy.get('#first-name')
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(emailTwo)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('.form-check-input').click()
        cy.get('[type=submit]').contains('Submit').click()
        cy.wait(1000)
        cy.get(".nav-link").contains("Register").should('be.visible')
    })

    it('GA-46 : Register page test - Last name input field: required ', () => {
        cy.visit('/register')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name')
        cy.get('#email').type(emailTwo)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('.form-check-input').click()
        cy.get('[type=submit]').contains('Submit').click()
        cy.wait(1000)
        cy.get(".nav-link").contains("Register").should('be.visible')
    })

    it('GA-54 : Register page test - Email input field: required ', () => {
        cy.visit('/register')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email')
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('.form-check-input').click()
        cy.get('[type=submit]').contains('Submit').click()
        cy.wait(1000)
        cy.get(".nav-link").contains("Register").should('be.visible')
    })

    it('GGA-55 : Register page test - Email field format invalid ', () => {
        cy.visit('/register')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('invalid@email')
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('.form-check-input').click()
        cy.get('[type=submit]').contains('Submit').click()
        cy.wait(1000)
        cy.get('.alert').contains('The email must be a valid email address').should('be.visible')
        cy.get(".nav-link").contains("Register").should('be.visible')
    })

    it('GA-59 : Register page test - Password input field empty ', () => {
        cy.visit('/register')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(emailTwo)
        cy.get('#password')
        cy.get('#password-confirmation').type(password)
        cy.get('.form-check-input').click()
        cy.get('[type=submit]').contains('Submit').click()
        cy.wait(1000)
        cy.get(".nav-link").contains("Register").should('be.visible')
})

  it('GA-60 : Register page test - Password Confirm input field empty', () => {
    cy.visit('/register')
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(emailTwo)
    cy.get('#password').type(password)
    cy.get('#password-confirmation')
    cy.get('.form-check-input').click()
    cy.get('[type=submit]').contains('Submit').click()
    cy.wait(1000)
    cy.get(".nav-link").contains("Register").should('be.visible')
  } )

  it('GA-81 : Confirmation password doesnt match', () => {
    cy.visit('/register')
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(emailTwo)
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type('testtest3')
    cy.get('.form-check-input').click()
    cy.get('[type=submit]').contains('Submit').click()
    cy.wait(1000)
    cy.get('.alert').contains('The password confirmation does not match').should('be.visible')
                                                                         .should('contains.text', 'The password confirmation does not match.')
    cy.get(".nav-link").contains("Register").should('be.visible')
  })

  it('GA-82 : Password form - invalid',  () => {
    cy.visit('/register')
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(emailTwo)
    cy.get('#password').type('password')
    cy.get('#password-confirmation').type('password')
    cy.get('.form-check-input').click()
    cy.get('[type=submit]').contains('Submit').click()
    cy.wait(1000)
    cy.get('.alert').contains('The password format is invalid.').should('be.visible')
                                                                         .should('contains.text', 'The password format is invalid.')
    cy.get(".nav-link").contains("Register").should('be.visible')
  })
  
  it('GA-83 : Password form - password has less then 8 characters  ', () => {
    cy.visit('/register')
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(emailTwo)
    cy.get('#password').type('pass2')
    cy.get('#password-confirmation').type('pass2')
    cy.get('.form-check-input').click()
    cy.get('[type=submit]').contains('Submit').click()
    cy.wait(1000)
    cy.get('.alert').contains('The password must be at least 8 characters').should('be.visible')
                                                                         .should('contains.text', 'The password must be at least 8 characters.')
    cy.get(".nav-link").contains("Register").should('be.visible')
  } )

  it('GA-84 : User can not be registered twice', () => { 
        cy.visit('/register')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('.form-check-input').click()
        cy.get('[type=submit]').contains('Submit').click()
        cy.wait(1000)
        cy.get('.alert').contains('The email has already been taken.').should('be.visible')
                                                                         .should('contains.text', 'The email has already been taken.')
        cy.get(".nav-link").contains("Register").should('be.visible')

  } )

})