/* eslint-disable no-undef */
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import ThreadItem from '../../components/ThreadItem';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
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

const mockNavigate = jest.fn();
const mockProps = {
  id: 'vote-1',
  title: 'Thread Pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  category: 'general',
  body: '<p>Ini adalah isi thread</p>',
  upVotesBy: ['user-1', 'user-3'],
  downVotesBy: ['user-2'],
  totalComments: 2,
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  authUser: 'users-1',
};
describe('threadItem component', () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should display thread title, body, category, and owner name', () => {
    render(<ThreadItem {...mockProps} />);

    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('Ini adalah isi thread')).toBeInTheDocument();
    expect(screen.getByText('#general')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should navigate to detail page when title is clicked', () => {
    render(<ThreadItem {...mockProps} />);
    const titleElement = screen.getByText('Thread Pertama');
    fireEvent.click(titleElement);
    expect(mockNavigate).toHaveBeenCalledWith('/threads/vote-1');
  });
});
