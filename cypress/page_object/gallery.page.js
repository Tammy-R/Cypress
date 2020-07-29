export default class GalleryPage {

    get email() {
        return cy.get('#email')
    }
    get password() {
        return cy.get('#password')
    }
    get loginButton() {
        return cy.get('button[type="submit"]')
    }
    get submitButton() {
        return cy.get('button[type="submit"]').contains('Submit')
    }

    get title() {
        return cy.get('#title')
    }

    get description() {
        return cy.get('#description')
    }

    get image() {
        return cy.get('[type=url]')
    }

    get addImageButton() {
        return cy.get('[type=button]').contains('Add image')
    }

    get trashButton() {
        return cy.get('.fa-trash').eq(1)
    }

    get alert() {
        return cy.get('.alert')
    }

    get gallery() {
        return cy.get('.box-title').eq(0)
    }

    get deleteButton(){
        return cy.get('.btn').contains('Delete Gallery')
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

    create(title, description, image) {
        if (title) {
            this.title.type(title)
        }
        if (description) {
            this.description.type(description)
        }
        if (image) {
            this.image.type('https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg')
        }
        this.addImageButton.click()
        this.trashButton.click()
        this.submitButton.click()
    }

    
        
    
    
}

export const galleryPage = new GalleryPage()