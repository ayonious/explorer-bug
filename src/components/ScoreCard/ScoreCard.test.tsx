/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScoreCard from '.';

describe('ScoreCard Component', () => {
  it('renders with initial score', () => {
    render(<ScoreCard score={10} />);
    expect(screen.getByText(/Scores: 10/)).toBeInTheDocument();
  });

  it('renders with zero score', () => {
    render(<ScoreCard score={0} />);
    expect(screen.getByText(/Scores: 0/)).toBeInTheDocument();
  });

  it('renders with large score values', () => {
    render(<ScoreCard score={999999} />);
    expect(screen.getByText(/Scores: 999999/)).toBeInTheDocument();
  });

  it('renders with negative score values', () => {
    render(<ScoreCard score={-5} />);
    expect(screen.getByText(/Scores: -5/)).toBeInTheDocument();
  });

  it('updates when score prop changes', () => {
    const { rerender } = render(<ScoreCard score={10} />);
    expect(screen.getByText(/Scores: 10/)).toBeInTheDocument();

    // Rerender with new score
    rerender(<ScoreCard score={20} />);
    expect(screen.getByText(/Scores: 20/)).toBeInTheDocument();
  });

  it('maintains correct styling', () => {
    render(<ScoreCard score={10} />);
    const scoreText = screen.getByText(/Scores: 10/);
    
    // Check if it's an h1 element
    expect(scoreText.tagName).toBe('H1');
    
    // Check if it's inside a styled div
    expect(scoreText.parentElement).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
    });
  });
});
