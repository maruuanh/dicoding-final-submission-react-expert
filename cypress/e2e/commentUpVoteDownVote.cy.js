/**
 test scenario for commentUpVoteDownVote e2e
 - commentUpVoteDownVote spec
  - should display upvote and downvote button in thread
  - should display blue-colored on upvote button when clicked
  - should display red-colored on downvote button when clicked
*/
import api from '../../src/utils/api';
describe('commentUpVoteDownVote spec', () => {
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
    cy.intercept('GET', `${baseUrl}/threads/thread-1`, {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          detailThread: {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Ini adalah komentar pertama',
                createdAt: '2021-06-21T07:00:00.000Z',
                owner: {
                  id: 'users-1',
                  name: 'John Doe',
                  avatar: 'https://generated-image-url.jpg',
                },
                upVotesBy: [],
                downVotesBy: [],
              },
            ],
          },
        },
      },
    }).as('getDetailThread');

    cy.visit('http://localhost:5173/threads/thread-1', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert');
      },
    });

    cy.wait('@getOwnProfile');

    cy.intercept('GET', '**/users/**', (req) => {
      console.log('Intercepted users endpoint', req);
    });
    cy.wait('@getDetailThread');
  });

  it('should display upvote and downvote button in thread', () => {
    cy.wait('@getDetailThread');
    cy.get('div[data-testid="upvote-comment-1"] button').should('be.visible');
    cy.get('div[data-testid="downvote-comment-1"] button').should('be.visible');
  });

  it('should display blue-colored on upvote button when clicked', () => {
    cy.intercept(
      'POST',
      `${baseUrl}/threads/thread-1/comments/comment-1/up-vote`,
      {
        statusCode: 200,
        body: {
          status: 'success',
          message: 'Thread upvoted',
          data: {
            vote: {
              id: 'vote-1',
              userId: 'user-1',
              commentId: 'comment-1',
              voteType: 1,
            },
          },
        },
      }
    ).as('onUpVote');

    cy.get('div[data-testid="upvote-comment-1"] button').click();
    cy.wait('@onUpVote');
    cy.get('div[data-testid="upvote-comment-1"] button').should(
      'have.css',
      'color',
      'rgb(0, 0, 255)'
    );
  });

  it('should display red-colored on downvote button when clicked', () => {
    cy.intercept(
      'POST',
      `${baseUrl}/threads/thread-1/comments/comment-1/down-vote`,
      {
        statusCode: 200,
        body: {
          status: 'success',
          message: 'Thread downvoted',
          data: {
            vote: {
              id: 'vote-1',
              userId: 'user-1',
              commentId: 'comment-1',
              voteType: -1,
            },
          },
        },
      }
    ).as('onDownVote');

    cy.get('div[data-testid="downvote-comment-1"] button').click();
    cy.wait('@onDownVote');
    cy.get('div[data-testid="downvote-comment-1"] button').should(
      'have.css',
      'color',
      'rgb(255, 0, 0)'
    );
  });
});
