import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadReplyInput from '../../components/ThreadReplyInput';

// Custom matcher untuk toHaveValue
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

describe('ThreadReplyInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle thread reply typing correctly', async () => {
    render(<ThreadReplyInput replyThread={() => {}} />);
    const replyInput = await screen.getByPlaceholderText('Your reply');

    await userEvent.type(replyInput, 'Bagus banget');

    expect(replyInput).toHaveValue('Bagus banget');
  });
});
