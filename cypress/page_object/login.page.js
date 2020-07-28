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

get terms () {
    return cy.get('.form-check-input')
}


login(mejl, sifra){
    this.email.type(mejl)
    this.password.type(sifra)
    this.loginButton.click()
}


}

export const authPage = new AuthPage()