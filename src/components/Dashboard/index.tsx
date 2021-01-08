import * as React from 'react';
import GithubCorner from 'react-github-corner';

import {
  COL_LIMIT,
  getNewGrid,
  getNewScore,
  moveForward,
  RobotState,
  ROW_LIMIT,
  turnLeft,
  turnRight,
} from '../../helpers/DirectionManager';
import BoardResults from '../BoardResults';
import Greeting from '../Greeting';
import JoyPad from '../JoyPad';
import ScoreCard from '../ScoreCard';
import { MainDashboard } from './styles';
import GithubCornerPart from './GitCorner';

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
const genFoodLocation = (rowNums: number, colNums: number): number[][] => {
  return [...Array(rowNums)].map(() => {
    return [...Array(colNums)].map(() => randomTossProbabilibty15());
  });
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
      score: getNewScore(newLocation, this.state.score, this.state.gridState),
      gridState: getNewGrid(newLocation, this.state.gridState),
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
        <GithubCornerPart />
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

        <BoardResults
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
