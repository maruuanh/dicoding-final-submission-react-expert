/**
 test scenario for Navigation
 - Navigation component
  - should render navigation links
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import Navigation from '../../components/Navigation';

describe('Navigation component', () => {
  it('should render navigation links', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Navigation />,
        },
      ],
      {
        initialEntries: ['/'],
        future: {
          // eslint-disable-next-line camelcase
          v7_relativeSplatPath: true,
        },
      }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Threads')).toBeInTheDocument();
    expect(screen.getByText('Leaderboards')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
