import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CategoryBadge from '../../components/CategoryBadge';

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

describe('threadDetail component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render category name prefixed with #', () => {
    render(<CategoryBadge category="redux" />);
    expect(screen.getByText('#redux')).toBeInTheDocument();
  });
  it('should have active class when isActive is true', () => {
    render(<CategoryBadge category="redux" isActive />);
    const badge = screen.getByText('#redux');
    expect(badge).toHaveClass('bg-secondary', 'text-white');
  });
  it('should use pointer cursor when setPointer is true', () => {
    render(<CategoryBadge category="redux" setPointer={true} />);
    const badge = screen.getByText('#redux');
    expect(badge).toHaveStyle('cursor: pointer');
  });

  it('should use default cursor when setPointer is false', () => {
    render(<CategoryBadge category="redux" setPointer={false} />);
    const badge = screen.getByText('#redux');
    expect(badge).toHaveStyle('cursor: default');
  });

  it('should call onCategoryClick when clicked', () => {
    const handleClick = jest.fn();
    render(<CategoryBadge category="redux" onCategoryClick={handleClick} />);
    const badge = screen.getByText('#redux');
    badge.click();
    expect(handleClick).toHaveBeenCalledWith('redux');
  });
});
