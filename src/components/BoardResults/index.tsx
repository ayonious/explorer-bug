import BugReportIcon from '@mui/icons-material/BugReport';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import React from 'react';

import {
  COL_LIMIT,
  robotPosToFlightStyle,
  RobotState,
  ROW_LIMIT,
} from '../../helpers/DirectionManager';
import { Cell, Grid, Row } from './styles';

const inputToPlayerIcon = (
  robotState: RobotState,
  cellState: number,
  rowId: number,
  colId: number
) => {
  const isLocationForPlayer =
    robotState.col === colId && robotState.row === rowId;
  const isLocationForFood = !isLocationForPlayer && !!cellState;
  const isBlank = !isLocationForPlayer && !isLocationForFood;

  return (
    <div
      style={
        isLocationForPlayer ? robotPosToFlightStyle(robotState) : undefined
      }
    >
      {isLocationForPlayer && <BugReportIcon />}
      {isLocationForFood && <FilterVintageIcon />}
      {isBlank && ''}
    </div>
  );
};

const CreateCell = (props: {
  robotState: RobotState;
  cellState: number;
  rowId: number;
  colId: number;
}) => {
  const { robotState, rowId, colId, cellState } = props;
  return (
    <Cell data-testid={`cell-${rowId}-${colId}`}>
      {inputToPlayerIcon(robotState, cellState, rowId, colId)}
    </Cell>
  );
};

const CreateRow = (props: {
  robotState: RobotState;
  rowGrid: number[];
  colCount: number;
  rowId: number;
}) => {
  const { robotState, colCount, rowId, rowGrid } = props;
  const columnList = Array(colCount)
    .fill(0)
    .map((e, colId) => (
      <CreateCell
        key={`colId:${colId}-rowId:${rowId}`}
        robotState={robotState}
        cellState={rowGrid[colId]}
        rowId={rowId}
        colId={colId}
      />
    ));
  return <Row>{columnList}</Row>;
};

const CreateRows = (props: {
  robotState: RobotState;
  gridState: number[][];
  rowCount: number;
}) => {
  const { robotState, rowCount, gridState } = props;
  const rowList = Array(rowCount)
    .fill(0)
    .map((e, rowId) => (
      <CreateRow
        key={`rowId-${rowId}`}
        robotState={robotState}
        rowGrid={gridState[rowId]}
        rowId={rowId}
        colCount={COL_LIMIT}
      />
    ));
  return <div>{rowList}</div>;
};
interface Props {
  robotState: RobotState;
  gridState: number[][];
}

const BoardResults = (props: Props) => {
  return (
    <Grid data-testid="game-board">
      <CreateRows
        robotState={props.robotState}
        gridState={props.gridState}
        rowCount={ROW_LIMIT}
      />
    </Grid>
  );
};

export default BoardResults;
