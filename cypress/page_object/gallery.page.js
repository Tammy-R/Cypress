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

    get cancelButton() {
        return cy.get('button[type="submit"]').contains('Cancel')
    }

    get title() {
        return cy.get('#title')
    }

    get description() {
        return cy.get('#description')
    }

    get image() {
        return cy.get('[type=url]').eq(0)
    }

    get secondImg () {
        return cy.get('[type=url]').eq(1)
    }

    get addImageButton() {
        return cy.get('button[type=button]').contains('Add image')
    }

    get trashButton() {
        return cy.get('.fa-trash').eq(1)
    }

    get moveUp() {
        return cy.get('.input-buttons').eq(2)
    }
    get moveDown() {
        return cy.get('.input-buttons').eq(5) 
    }

    get alert() {
        return cy.get('.alert')
    }

    get gallery() {
        return cy.get('.box-title').eq(0)
    }

    get deleteButton(){
        return cy.get('.btn-custom').eq(0).contains('Delete Gallery')
    }

    get editGallery(){
        return cy.get('.btn-custom').eq(1).contains('Edit Gallery')
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