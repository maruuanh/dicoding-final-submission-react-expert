import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ThreadDetail from '../../components/ThreadDetail';

expect.extend({
  toHaveValue(received, value) {
    const pass = received.value === value;
    if (pass) {
      return {
        message: () => `expected ${received} not to have value "${value}"`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to have value "${value}", but got "${received.value}"`,
        pass: false,
      };
    }
  },
});

const mockProps = {
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
  authUser: 'users-1',
};

describe('threadDetail component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display thread title, body, category, and owner name', () => {
    render(<ThreadDetail {...mockProps} />);

    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('Ini adalah thread pertama')).toBeInTheDocument();
    expect(screen.getByText('#General')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
