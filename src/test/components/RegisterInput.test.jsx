import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from '../../components/RegisterInput';

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

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    await userEvent.type(nameInput, 'janedoe');

    expect(nameInput).toHaveValue('janedoe');
  });
  it('should handle email typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Name');

    await userEvent.type(emailInput, 'janedoe@email.com');

    expect(emailInput).toHaveValue('janedoe@email.com');
  });
  it('should handle password typing correctly', async () => {
    // Arrange

    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');
    // Action
    await userEvent.type(passwordInput, 'passwordtest');
    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });
});
