import { BugIcon, StrawberryIcon } from './icons';
import React from 'react';

import {
  COL_LIMIT,
  robotPosToFlightStyle,
  ROW_LIMIT,
} from '../../helpers/DirectionManager';
import type { RobotState } from '../../helpers/DirectionManager';
import { Cell, Grid, Player, Row, YumBubble } from './styles';

const inputToPlayerIcon = (
  robotState: RobotState,
  cellState: number,
  rowId: number,
  colId: number,
  showYum: boolean,
  yumKey: number
) => {
  const isLocationForPlayer =
    robotState.col === colId && robotState.row === rowId;
  const isLocationForFood = !isLocationForPlayer && !!cellState;
  const isBlank = !isLocationForPlayer && !isLocationForFood;

  return (
    <div>
      {isLocationForPlayer && (
        <Player>
          <div style={robotPosToFlightStyle(robotState)}><BugIcon /></div>
          {showYum && <YumBubble key={yumKey} data-testid="yum-bubble">Yum!</YumBubble>}
        </Player>
      )}
      {isLocationForFood && <StrawberryIcon />}
      {isBlank && ''}
    </div>
  );
};

const CreateCell = (props: {
  robotState: RobotState;
  cellState: number;
  rowId: number;
  colId: number;
  showYum?: boolean;
  yumKey?: number;
}) => {
  const { robotState, rowId, colId, cellState, showYum, yumKey } = props;
  return (
    <Cell data-testid={`cell-${rowId}-${colId}`}>
      {inputToPlayerIcon(robotState, cellState, rowId, colId, showYum, yumKey)}
    </Cell>
  );
};

const CreateRow = (props: {
  robotState: RobotState;
  rowGrid: number[];
  colCount: number;
  rowId: number;
  showYum: boolean;
  yumKey: number;
}) => {
  const { robotState, colCount, rowId, rowGrid, showYum, yumKey } = props;
  const columnList = Array(colCount)
    .fill(0)
    .map((e, colId) => (
      <CreateCell
        key={`colId:${colId}-rowId:${rowId}`}
        robotState={robotState}
        cellState={rowGrid[colId]}
        rowId={rowId}
        colId={colId}
        showYum={showYum}
        yumKey={yumKey}
      />
    ));
  return <Row>{columnList}</Row>;
};

const CreateRows = (props: {
  robotState: RobotState;
  gridState: number[][];
  rowCount: number;
  showYum: boolean;
  yumKey: number;
}) => {
  const { robotState, rowCount, gridState, showYum, yumKey } = props;
  const rowList = Array(rowCount)
    .fill(0)
    .map((e, rowId) => (
      <CreateRow
        key={`rowId-${rowId}`}
        robotState={robotState}
        rowGrid={gridState[rowId]}
        rowId={rowId}
        colCount={COL_LIMIT}
        showYum={showYum}
        yumKey={yumKey}
      />
    ));
  return <div>{rowList}</div>;
};
interface Props {
  robotState: RobotState;
  gridState: number[][];
  showYum: boolean;
  yumKey: number;
}

const BoardResults = (props: Props) => {
  return (
    <Grid data-testid="game-board">
      <CreateRows
        robotState={props.robotState}
        gridState={props.gridState}
        rowCount={ROW_LIMIT}
        showYum={props.showYum ?? false}
        yumKey={props.yumKey ?? 0}
      />
    </Grid>
  );
};

export default BoardResults;
