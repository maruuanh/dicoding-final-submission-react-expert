/**
 test scenario for showLeaderBoards e2e
 - showLeaderBoards spec
  - should display the leaderboards
*/

import api from '../../src/utils/api';

describe('showLeaderBoards Spec', () => {
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
    }).as('getOwnProfile');
    cy.intercept('GET', `${baseUrl}/leaderboards`, {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          leaderboards: [
            {
              user: {
                id: 'users-1',
                name: 'John Doe',
                email: 'john@example.com',
                avatar:
                  'https://ui-avatars.com/api/?name=John Doe&background=random',
              },
              score: 10,
            },
            {
              user: {
                id: 'users-2',
                name: 'Jane Doe',
                email: 'jane@example.com',
                avatar:
                  'https://ui-avatars.com/api/?name=Jane Doe&background=random',
              },
              score: 5,
            },
          ],
        },
      },
    }).as('getLeaderboards');

    cy.visit('http://localhost:5173/leaderboards', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert');
      },
    });

    cy.wait('@getLeaderboards');
  });

  it('should display the leaderboards', () => {
    cy.wait('@getLeaderboards');
    cy.contains('John Doe').should('be.visible');
    cy.contains('Jane Doe').should('be.visible');
    cy.contains(10).should('be.visible');
    cy.contains(5).should('be.visible');
  });
});
