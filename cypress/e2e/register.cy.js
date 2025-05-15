describe('Register Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert');
      },
    });
  });
  it('should display register page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman register
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });
  it('should display alert when name is empty', () => {
    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('"name" is not allowed to be empty');
    });
    cy.get('@alert').should('have.been.calledWith', 'Invalid token structure');
  });
  it('should display alert when email is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Name"]').type('Jane Doe');

    // klik tombol register tanpa mengisi password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('"email" is not allowed to be empty');
    });
    cy.get('@alert').should('have.been.calledWith', 'Invalid token structure');
  });
  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Name"]').type('Sally Van');
    cy.get('input[placeholder="Email"]').type('sally@email.com');

    // klik tombol Register tanpa mengisi password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('"password" is not allowed to be empty');
    });
    cy.get('@alert').should('have.been.calledWith', 'Invalid token structure');
  });
  it('should display alert when password length is less than 6 charcters', () => {
    // mengisi email
    cy.get('input[placeholder="Name"]').type('Sally Van');
    cy.get('input[placeholder="Email"]').type('sally@email.com');
    cy.get('input[placeholder="Password"]').type('sally');
    // klik tombol Register tanpa mengisi password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal(
        'password must be at least 6 characters long'
      );
    });
    cy.get('@alert').should('have.been.calledWith', 'Invalid token structure');
  });

  it('should display login page when username, email, and password are correct and successfully registered', () => {
    cy.get('input[placeholder="Name"]').type('Sally Van');
    cy.get('input[placeholder="Email"]').type('sallyv23@gmail.com');
    cy.get('input[placeholder="Password"]').type('sallyvan');
    cy.get('button')
      .contains(/^Register$/)
      .click();
    // menekan tombol Login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });
});
