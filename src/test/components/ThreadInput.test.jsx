/**
 test scenario for ThreadInput
 - ThreadInput component
  - should handle title typing correctly
  - should handle category typing correctly
  - should handle content typing correctly
*/

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from '../../components/ThreadInput';

/**
 * @jest-environment jsdom
 */
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

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    render(<ThreadInput addThread={() => { }} />);
    const titleInput = await screen.getByPlaceholderText('Judul');

    await userEvent.type(titleInput, 'Pengenalan Redux');

    expect(titleInput).toHaveValue('Pengenalan Redux');
  });
  it('should handle category typing correctly', async () => {
    render(<ThreadInput addThread={() => { }} />);
    const categoryInput = await screen.getByPlaceholderText('Kategori');

    await userEvent.type(categoryInput, 'Pemrograman');

    expect(categoryInput).toHaveValue('Pemrograman');
  });
  it('should handle content typing correctly', async () => {
    render(<ThreadInput addThread={() => { }} />);
    const contentInput = await screen.getByPlaceholderText(
      'Apa yang mau kamu bahas?'
    );

    await userEvent.type(
      contentInput,
      'Redux adalah salah satu library untuk React sebagai state management'
    );

    expect(contentInput).toHaveValue(
      'Redux adalah salah satu library untuk React sebagai state management'
    );
  });
});
