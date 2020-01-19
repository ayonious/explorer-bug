import * as React from 'react';

import {
  COL_LIMIT,
  getnewGrid,
  getnewScore,
  moveForward,
  RobotState,
  ROW_LIMIT,
  turnLeft,
  turnRight,
} from '../helpers/DirectionManager';
import { MainDashboard } from '../styledcomponents/styles';
import BoardReults from './BoardResults';
import JoyPad from './JoyPad';
import { Greeting, ScoreCard } from './Utils';

interface Props {}

interface State {
  robotState: RobotState;
  liveInputScript: string;
  score: number;
  gridState: number[][];
}

const randomTossProbabilibty15 = () => {
  return Math.floor(Math.random() * 100 + 1) < 15 ? 1 : 0;
};

// generate a grid, if 1 then there is a food otherwise no food
const genFoodLocation = (rowNums: number, colNums: number) => {
  const ret: number[][] = [];
  for (let i = 0; i < rowNums; i++) {
    const rowArr: number[] = [];
    for (let j = 0; j < colNums; j++) {
      rowArr.push(randomTossProbabilibty15());
    }
    ret.push(rowArr);
  }
  return ret;
};

export default class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changedInput = this.changedInput.bind(this);
    this.handleGo = this.handleGo.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.state = {
      liveInputScript: '',
      robotState: {
        row: 0,
        col: 0,
        direction: 0,
      },
      score: 0,
      gridState: genFoodLocation(ROW_LIMIT, COL_LIMIT),
    };
  }

  changedInput(event: any) {
    this.setState({ liveInputScript: event.target.value });
  }

  handleGo() {
    const newLocation: RobotState = moveForward(this.state.robotState);
    this.setState({
      robotState: newLocation,
      score: getnewScore(newLocation, this.state.score, this.state.gridState),
      gridState: getnewGrid(newLocation, this.state.gridState),
    });
  }

  handleLeft() {
    this.setState({
      robotState: turnLeft(this.state.robotState),
    });
  }

  handleRight() {
    this.setState({
      robotState: turnRight(this.state.robotState),
    });
  }

  render() {
    return (
      <MainDashboard>
        <div>
          <Greeting />
          <ScoreCard score={this.state.score} />
        </div>

        <JoyPad
          handleGo={this.handleGo}
          handleLeft={this.handleLeft}
          handleRight={this.handleRight}
        />

        <div>
          {' '}
          <br />{' '}
        </div>

        <BoardReults
          robotState={this.state.robotState}
          gridState={this.state.gridState}
        />

        <div>
          {' '}
          <br />{' '}
        </div>
      </MainDashboard>
    );
  }
}
