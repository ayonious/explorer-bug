import * as React from 'react';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import {
  COL_LIMIT,
  getNewGrid,
  getNewScore,
  moveForward,
  ROW_LIMIT,
  turnLeft,
  turnRight,
} from '../../helpers/DirectionManager';
import type { RobotState } from '../../helpers/DirectionManager';
import { gameLogger, LogType } from '../../helpers/Logger';
import BoardResults from '../BoardResults';
import Greeting from '../Greeting';
import JoyPad from '../JoyPad';
import ScoreCard from '../ScoreCard';
import { HeadingSlot, KeyboardHint, MainDashboard } from './styles';
import GithubCornerPart from './GitCorner';

interface Props {}

interface State {
  robotState: RobotState;
  liveInputScript: string;
  score: number;
  gridState: number[][];
  showLogs: boolean;
  level: number;
  levelComplete: boolean;
}

const randomTossProbabilibty15 = () => {
  return Math.floor(Math.random() * 100 + 1) < 15 ? 1 : 0;
};

// generate a grid, if 1 then there is a food otherwise no food
const genFoodLocation = (rowNums: number, colNums: number): number[][] => {
  const grid = [...Array(rowNums)].map(() => {
    return [...Array(colNums)].map(() => randomTossProbabilibty15());
  });
  grid[0][0] = 0;
  if (!grid.some(row => row.some(Boolean))) grid[0][1] = 1;
  return grid;
};

export default class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleGo = this.handleGo.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleLogs = this.toggleLogs.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.startNextLevel = this.startNextLevel.bind(this);

    this.state = {
      liveInputScript: '',
      robotState: {
        row: 0,
        col: 0,
        direction: 0,
      },
      score: 0,
      gridState: genFoodLocation(ROW_LIMIT, COL_LIMIT),
      showLogs: false,
      level: 1,
      levelComplete: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    gameLogger.logGameStart();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.target instanceof HTMLElement &&
        event.target.closest('button, a, input, textarea, select')) return;
    if (['ArrowUp', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      event.preventDefault();
    }
    switch (event.key) {
      case 'ArrowUp':
      case ' ':
      case 'w':
        this.handleGo();
        break;
      case 'ArrowLeft':
      case 'a':
        this.handleLeft();
        break;
      case 'ArrowRight':
      case 'd':
        this.handleRight();
        break;
      case 'l':
        this.toggleLogs();
        break;
      case 'r':
        this.resetGame();
        break;
      default:
        break;
    }
  }

  toggleLogs() {
    this.setState(prevState => ({ showLogs: !prevState.showLogs }));
  }

  handleGo() {
    if (this.state.levelComplete) return;
    const newLocation: RobotState = moveForward(this.state.robotState);
    const newScore = getNewScore(newLocation, this.state.score, this.state.gridState);
    const newGrid = getNewGrid(newLocation, this.state.gridState);

    // Log movement
    gameLogger.logMovement('forward', newLocation);

    // Log score increase if it happened
    if (newScore > this.state.score) {
      gameLogger.logScore(newScore, { row: newLocation.row, col: newLocation.col });
    }

    this.setState({
      robotState: newLocation,
      score: newScore,
      gridState: newGrid,
      levelComplete: !newGrid.some(row => row.some(Boolean)),
    });
  }

  handleLeft() {
    if (this.state.levelComplete) return;
    const newLocation = turnLeft(this.state.robotState);
    gameLogger.logMovement('left', newLocation);

    this.setState({
      robotState: newLocation,
    });
  }

  handleRight() {
    if (this.state.levelComplete) return;
    const newLocation = turnRight(this.state.robotState);
    gameLogger.logMovement('right', newLocation);

    this.setState({
      robotState: newLocation,
    });
  }

  startNextLevel() {
    this.setState(prevState => ({
      level: prevState.level + 1,
      levelComplete: false,
      robotState: { row: 0, col: 0, direction: 0 },
      gridState: genFoodLocation(ROW_LIMIT, COL_LIMIT),
    }));
    gameLogger.logGameStart();
  }

  resetGame() {
    const newState = {
      level: 1,
      levelComplete: false,
      robotState: {
        row: 0,
        col: 0,
        direction: 0,
      },
      score: 0,
      gridState: genFoodLocation(ROW_LIMIT, COL_LIMIT),
    };

    gameLogger.logGameReset();
    this.setState(newState);
  }

  renderLogs() {
    if (!this.state.showLogs) return null;

    const logs = gameLogger.getLogs();

    return (
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          width: '300px',
          height: '200px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          overflowY: 'auto',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 1000
        }}
        data-testid="game-logs"
      >
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <strong>Game Logs</strong>
          <button
            onClick={this.toggleLogs}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {logs.map((log, index) => (
            <li key={index} style={{ marginBottom: '5px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px' }}>
              <div>
                <span style={{ color: this.getLogTypeColor(log.type) }}>[{log.type}]</span> {log.message}
              </div>
              <div style={{ fontSize: '10px', color: '#aaa' }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  getLogTypeColor(type: LogType) {
    switch (type) {
      case LogType.MOVEMENT:
        return '#64b5f6';
      case LogType.SCORE:
        return '#81c784';
      case LogType.GAME_START:
        return '#ba68c8';
      case LogType.GAME_RESET:
        return '#ffb74d';
      case LogType.ERROR:
        return '#e57373';
      default:
        return 'white';
    }
  }

  render() {
    return (
      <MainDashboard>
        <GithubCornerPart />
        <div>
          <HeadingSlot>
            {this.state.levelComplete ? (
              <div role="status">
                <Button
                  variant="contained"
                  color="success"
                  onClick={this.startNextLevel}
                  data-testid="next-level-button"
                  sx={{ whiteSpace: 'normal', padding: '12px 20px', fontSize: '1.1rem', textTransform: 'none' }}
                >
                  Hurray! Level {this.state.level} complete! 🎉 Click to start level {this.state.level + 1}
                </Button>
              </div>
            ) : <Greeting />}
          </HeadingSlot>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <span>Level {this.state.level}</span>
            <ScoreCard score={this.state.score} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<RestartAltIcon />}
              onClick={this.resetGame}
              data-testid="reset-game-button"
            >
              Reset
            </Button>

          </div>
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
        <KeyboardHint aria-label="Keyboard controls">
          <strong>⌨️ Your keyboard can play, too!</strong>
          <p>
            Move forward with <kbd>↑</kbd> / <kbd>W</kbd> / <kbd>Space</kbd>
            <span className="key-divider">·</span>
            Turn with <kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd>
          </p>
          <small><kbd>R</kbd> Reset <span className="key-divider">·</span> <kbd>L</kbd> Toggle logs</small>
        </KeyboardHint>

        {this.renderLogs()}
      </MainDashboard>
    );
  }
}
