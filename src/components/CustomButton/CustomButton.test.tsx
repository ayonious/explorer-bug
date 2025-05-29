/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomButton from '.';

describe('CustomButton Component', () => {
  it('renders with provided title', () => {
    render(<CustomButton title="Test Button" onClick={() => {}} />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<CustomButton title="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with correct test id', () => {
    render(<CustomButton title="Test Button" onClick={() => {}} />);
    expect(screen.getByTestId('move-button-Test Button')).toBeInTheDocument();
  });

  it('maintains button accessibility features', () => {
    render(<CustomButton title="Test Button" onClick={() => {}} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('Test Button');
  });

  it('handles long titles', () => {
    const longTitle = 'This is a very long button title that should still work properly';
    render(<CustomButton title={longTitle} onClick={() => {}} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('handles special characters in title', () => {
    const specialTitle = '!@#$%^&*()_+';
    render(<CustomButton title={specialTitle} onClick={() => {}} />);
    expect(screen.getByText(specialTitle)).toBeInTheDocument();
  });

  it('maintains correct styling', () => {
    render(<CustomButton title="Test Button" onClick={() => {}} />);
    const buttonContainer = screen.getByTestId('move-button-Test Button').closest('div');
    
    expect(buttonContainer).toHaveStyle({
      margin: '10px',
    });
  });
});
