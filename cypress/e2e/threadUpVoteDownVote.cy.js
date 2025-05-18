/* eslint-disable cypress/unsafe-to-chain-command */
import api from '../../src/utils/api';
describe('threadUpVoteDownVote spec', () => {
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
    cy.intercept('GET', `${baseUrl}/threads`, {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          threads: [
            {
              id: 'thread-Np47p4jhUXYhrhRn',
              title: 'Bagaimana pengalamanmu belajar Redux?',
              body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
              category: 'redux',
              createdAt: '2023-05-29T07:55:52.266Z',
              ownerId: 'user-mQhLzINW_w5TxxYf',
              totalComments: 1,
              upVotesBy: ['user-mQhLzINW_w5TxxYf', 'user-TG9rOZN4V6maJ7gl'],
              downVotesBy: [],
            },
          ],
        },
      },
    }).as('getThreads');

    cy.visit('http://localhost:5173/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert');
      },
    });

    cy.intercept('GET', '**/users/**', (req) => {
      console.log('Intercepted users endpoint', req);
    });
    cy.wait('@getThreads');
  });

  it('should display upvote and downvote button in thread', () => {
    cy.wait('@getThreads');
    cy.get('div[data-testid="upvote"]');
    cy.get('div[data-testid="downvote"]');
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

  it('should display blue-colored on upvote button when clicked', () => {
    cy.intercept('POST', `${baseUrl}/threads/thread-Np47p4jhUXYhrhRn/up-vote`, {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Thread upvoted',
        data: {
          vote: {
            id: 'vote-1',
            userId: 'user-1',
            threadId: 'thread-Np47p4jhUXYhrhRn',
            voteType: 1,
          },
        },
      },
    }).as('onUpVote');

    cy.get('div[data-testid="upvote"] button')
      .click()
      .should('have.class', 'active');
    cy.wait('@onUpVote');
    cy.get('div[data-testid="upvote"] button').should(
      'have.css',
      'color',
      'rgb(0, 0, 255)'
    );
  });
  it('should display red-colored on downvote button when clicked', () => {
    cy.intercept(
      'POST',
      `${baseUrl}/threads/thread-Np47p4jhUXYhrhRn/down-vote`,
      {
        statusCode: 200,
        body: {
          status: 'success',
          message: 'Thread downvoted',
          data: {
            vote: {
              id: 'vote-1',
              userId: 'user-1',
              threadId: 'thread-Np47p4jhUXYhrhRn',
              voteType: -1,
            },
          },
        },
      }
    ).as('onDownVote');

    cy.get('div[data-testid="downvote"] button')
      .click()
      .should('have.class', 'active');
    cy.wait('@onDownVote');
    cy.get('div[data-testid="downvote"] button').should(
      'have.css',
      'color',
      'rgb(255, 0, 0)'
    );
  });
});
