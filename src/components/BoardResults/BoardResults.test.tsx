/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoardResults from '.';
import { RobotState, ROW_LIMIT, COL_LIMIT, iconScale } from '../../helpers/DirectionManager';

describe('BoardResults Component', () => {
  const mockRobotState: RobotState = {
    col: 1,
    row: 1,
    direction: 0,
  };

  // Create a new grid for each test to avoid reference issues
  const createMockGrid = () => {
    const grid = Array(ROW_LIMIT).fill(null).map(() => Array(COL_LIMIT).fill(0));
    // Add some food items
    grid[0][0] = 1;
    grid[0][2] = 1;
    grid[1][1] = 1;
    grid[2][0] = 1;
    grid[2][1] = 1;
    grid[2][2] = 1;
    return grid;
  };

  afterEach(() => {
    cleanup();
  });

  it('renders the game board', () => {
    render(<BoardResults robotState={mockRobotState} gridState={createMockGrid()} />);
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
  });

  it('renders correct number of cells', () => {
    const mockGrid = createMockGrid();
    render(<BoardResults robotState={mockRobotState} gridState={mockGrid} />);
    const cells = screen.getAllByTestId(/^cell-\d+-\d+$/);
    expect(cells).toHaveLength(ROW_LIMIT * COL_LIMIT);
  });

  it('renders robot at correct position', () => {
    render(<BoardResults robotState={mockRobotState} gridState={createMockGrid()} />);
    const robotCell = screen.getByTestId(`cell-${mockRobotState.row}-${mockRobotState.col}`);
    expect(robotCell.querySelector('svg[data-testid="BugReportIcon"]')).toBeInTheDocument();
  });

  it('renders food at correct positions', () => {
    const mockGrid = createMockGrid();
    render(<BoardResults robotState={mockRobotState} gridState={mockGrid} />);
    
    mockGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // Skip robot position
        if (rowIndex === mockRobotState.row && colIndex === mockRobotState.col) {
          return;
        }
        
        const cellElement = screen.getByTestId(`cell-${rowIndex}-${colIndex}`);
        if (cell === 1) {
          expect(cellElement.querySelector('svg[data-testid="FilterVintageIcon"]')).toBeInTheDocument();
        } else {
          expect(cellElement.querySelector('svg')).not.toBeInTheDocument();
        }
      });
    });
  });

  it('handles robot rotation styles', () => {
    // Test all four directions
    [0, 1, 2, 3].forEach(direction => {
      const rotatedRobotState = { ...mockRobotState, direction };
      render(<BoardResults robotState={rotatedRobotState} gridState={createMockGrid()} />);
      
      const robotCell = screen.getByTestId(`cell-${rotatedRobotState.row}-${rotatedRobotState.col}`);
      const robotIcon = robotCell.querySelector('div');
      
      // Check if rotation style is applied
      expect(robotIcon).toHaveStyle({
        transform: iconScale[direction],
      });
      
      cleanup();
    });
  });

  it('handles empty grid', () => {
    const emptyGrid = Array(ROW_LIMIT).fill(null).map(() => Array(COL_LIMIT).fill(0));
    render(<BoardResults robotState={mockRobotState} gridState={emptyGrid} />);
    
    const foodIcons = screen.queryAllByTestId('FilterVintageIcon');
    expect(foodIcons).toHaveLength(0);
  });

  it('handles full grid', () => {
    const fullGrid = Array(ROW_LIMIT).fill(null).map(() => Array(COL_LIMIT).fill(1));
    render(<BoardResults robotState={mockRobotState} gridState={fullGrid} />);
    
    const cells = screen.getAllByTestId(/^cell-\d+-\d+$/);
    const foodCells = cells.filter(cell => 
      cell.querySelector('svg[data-testid="FilterVintageIcon"]')
    );
    
    // Number of food cells should be total cells minus one (robot position)
    expect(foodCells).toHaveLength((ROW_LIMIT * COL_LIMIT) - 1);
  });

  it('handles robot at grid boundaries', () => {
    const boundaryPositions = [
      { col: 0, row: 0, direction: 0 },
      { col: COL_LIMIT - 1, row: 0, direction: 0 },
      { col: 0, row: ROW_LIMIT - 1, direction: 0 },
      { col: COL_LIMIT - 1, row: ROW_LIMIT - 1, direction: 0 },
    ];

    boundaryPositions.forEach(position => {
      render(<BoardResults robotState={position} gridState={createMockGrid()} />);
      const robotCell = screen.getByTestId(`cell-${position.row}-${position.col}`);
      expect(robotCell.querySelector('svg[data-testid="BugReportIcon"]')).toBeInTheDocument();
      cleanup();
    });
  });
}); 