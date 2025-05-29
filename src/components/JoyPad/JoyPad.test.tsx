/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { expect } from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom';

import JoyPad from '.';

describe('JoyPad Component', () => {
  it('renders all control buttons', () => {
    const func = jest.fn();
    render(<JoyPad handleGo={func} handleLeft={func} handleRight={func} />);
    
    expect(screen.getByTestId('move-button-Go')).toBeInTheDocument();
    expect(screen.getByTestId('move-button-Left')).toBeInTheDocument();
    expect(screen.getByTestId('move-button-Right')).toBeInTheDocument();
  });

  it('calls appropriate handlers when buttons are clicked', () => {
    const handleGo = jest.fn();
    const handleLeft = jest.fn();
    const handleRight = jest.fn();

    render(
      <JoyPad
        handleGo={handleGo}
        handleLeft={handleLeft}
        handleRight={handleRight}
      />
    );

    fireEvent.click(screen.getByTestId('move-button-Go'));
    expect(handleGo).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('move-button-Left'));
    expect(handleLeft).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('move-button-Right'));
    expect(handleRight).toHaveBeenCalledTimes(1);
  });

  it('maintains correct button states', () => {
    const func = jest.fn();
    render(<JoyPad handleGo={func} handleLeft={func} handleRight={func} />);

    const goButton = screen.getByTestId('move-button-Go');
    const leftButton = screen.getByTestId('move-button-Left');
    const rightButton = screen.getByTestId('move-button-Right');

    // Check button text content
    expect(goButton).toHaveTextContent('Go');
    expect(leftButton).toHaveTextContent('Left');
    expect(rightButton).toHaveTextContent('Right');

    // Check button accessibility
    expect(goButton).toHaveAttribute('type', 'button');
    expect(leftButton).toHaveAttribute('type', 'button');
    expect(rightButton).toHaveAttribute('type', 'button');
  });
});
