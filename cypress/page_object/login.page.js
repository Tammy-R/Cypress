export default class AuthPage {

    get email() {
        return cy.get('#email')
    }
    get password() {
        return cy.get('#password')
    }

    get loginButton() {
        return cy.get('button[type="submit"]')
    }

    get firstName() {
        return cy.get('#first-name')
    }

    get lastName() {
        return cy.get('#last-name')
    }

    get passConfirm() {
        return cy.get('#password-confirmation')
    }

    get terms() {
        return cy.get('.form-check-input')
    }

    get alert() {
        return cy.get('.alert')
    }

    login(mejl, sifra) {
        if (mejl) {
            this.email.type(mejl)
        }
        if (sifra) {
            this.password.type(sifra)
        }
        this.loginButton.click()
    }

    register(firstName, lastName, email, password, passConfirm) {
        if(firstName) {
            this.firstName.type(firstName)

        }
        if(lastName){
            this.lastName.type(lastName)
        }
        if(email){
            this.email.type(email)
        }
        if(password){
            this.password.type(password)
        }
        if(passConfirm){
            this.passConfirm.type(passConfirm)
        }
        this.terms.click()
        this.loginButton.click()
    }

}

export const authPage = new AuthPage()