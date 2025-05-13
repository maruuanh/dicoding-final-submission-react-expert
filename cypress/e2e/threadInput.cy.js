import api from '../../src/utils/api';
describe('ThreadInput spec', () => {
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
            avatar: 'https://generated-avatar.jpg',
          },
        },
      },
    }).as('getProfile');

    cy.visit('http://localhost:5173/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert');
      },
    });
  });
  it('should display homepage and thread input when after login', () => {
    cy.get('input[placeholder="Judul"]').should('be.visible');
    cy.get('input[placeholder="Kategori"]').should('be.visible');
    cy.get('textarea[placeholder="Apa yang mau kamu bahas?"]').should(
      'be.visible'
    );
    cy.get('button')
      .contains(/^Thread$/)
      .should('be.visible');

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

  it('should display error message alert when title input is empty', () => {
    cy.get('button')
      .contains(/^Thread$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('"title" is not allowed to be empty');
    });
  });
  it('should display error message alert when body input is empty', () => {
    cy.get('input[placeholder="Judul"]').type('Pengenalan Redux');
    cy.get('button')
      .contains(/^Thread$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str.toString()).to.equal('"body" is not allowed to be empty');
    });
  });
  it('should display new thread when title and body input are correct and successfully added', () => {
    cy.intercept('POST', `${baseUrl}/threads`, {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          thread: {
            id: 'thread-1',
            title: 'Pengenalan Redux',
            body: 'Redux adalah salah satu libray React yang berfungsi sebagai state management',
            category: 'coding',
            createdAt: new Date().toISOString(),
            owner: {
              id: 'user-1',
              name: 'Jane Doe',
              avatar: 'https://generated-avatar.jpg',
            },
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        },
      },
    }).as('addThread');
    cy.get('input[placeholder="Judul"]').type('Pengenalan Redux');
    cy.get('input[placeholder="Kategori"]').type('coding');
    cy.get('textarea[placeholder="Apa yang mau kamu bahas?"]').type(
      'Redux adalah salah satu libray React yang berfungsi sebagai state management'
    );
    cy.get('button')
      .contains(/^Thread$/)
      .click();

    cy.wait('@addThread');
    cy.contains('coding').should('be.visible');
    cy.contains('Pengenalan Redux').should('be.visible');
    cy.contains('Redux adalah salah satu libray React').should('be.visible');
  });
});
