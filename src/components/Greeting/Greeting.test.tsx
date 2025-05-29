/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Greeting from '.';

describe('Greeting Component', () => {
  it('renders the welcome message', () => {
    render(<Greeting />);
    expect(screen.getByText('Move the bug to eat all food!')).toBeInTheDocument();
  });

  it('renders with correct heading level', () => {
    render(<Greeting />);
    const heading = screen.getByText('Move the bug to eat all food!');
    expect(heading.tagName).toBe('H1');
  });

  it('maintains correct styling', () => {
    render(<Greeting />);
    const container = screen.getByText('Move the bug to eat all food!').parentElement;
    expect(container).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
    });
  });

  it('is accessible', () => {
    render(<Greeting />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Move the bug to eat all food!');
  });

  it('has correct text trimming', () => {
    render(<Greeting />);
    const heading = screen.getByText('Move the bug to eat all food!');
    expect(heading.textContent?.trim()).toBe('Move the bug to eat all food!');
  });
});
