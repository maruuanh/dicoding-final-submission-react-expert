import api from '../../src/utils/api';

describe('Login spec', () => {
  const baseUrl = api.BASE_URL;
  beforeEach(() => {
    window.localStorage.setItem('accessToken', 'user-access-token');
    cy.intercept('GET', `${baseUrl}/users/me`, {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'Jane Doe',
            email: 'janedoe@email.com',
            avatar:
              'https://ui-avatars.com/api/?name=Jane Doe&background=random',
          },
        },
      },
    }).as('getOwnProfile');
    cy.visit('http://localhost:5173/profile', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert');
      },
    });
    cy.wait('@getOwnProfile');
  });
  it('should display profile page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.wait('@getOwnProfile');
    cy.contains('@Jane Doe').should('be.visible');
    cy.contains('janedoe@email.com').should('be.visible');
    cy.get('button')
      .contains(/^Logout$/)
      .should('be.visible');
  });

  it('should display login page when logout button is clicked', () => {
    // menekan tombol Login
    cy.get('button')
      .contains(/^Logout$/)
      .click();

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });
});
