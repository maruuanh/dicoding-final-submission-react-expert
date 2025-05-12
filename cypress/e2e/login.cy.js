describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert');
      },
    });
  });
  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('"email" is not allowed to be empty');
    });
    cy.get('@alert').should('have.been.calledWith', 'Invalid token structure');
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('janedoe@email.com');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('"password" is not allowed to be empty');
      cy.get('@alert').should(
        'have.been.calledWith',
        'Invalid token structure'
      );
    });
  });

  it('should display alert when user or password is wrong', () => {
    // mengisi email salah
    cy.get('input[placeholder="Email"]').type('test@email.com');
    // mengisi password salah
    cy.get('input[placeholder="Password"]').type('12345678');
    // klik tombol login dengan email atau password yang salah
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('email or password is wrong');
      cy.get('@alert').should(
        'have.been.calledWith',
        'Invalid token structure'
      );
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('janedoe@email.com');
    // mengisi password
    cy.get('input[placeholder="Password"]').type('janedoe');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav')
      .contains(/^Threads$/)
      .should('be.visible');
    cy.get('nav')
      .contains(/^Leaderboards$/)
      .should('be.visible');
    cy.get('nav')
      .contains(/^Profile$/)
      .should('be.visible');
  });
});
