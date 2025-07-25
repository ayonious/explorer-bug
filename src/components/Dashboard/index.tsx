import * as React from 'react';
import GithubCorner from 'react-github-corner';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
import { gameLogger, LogType } from '../../helpers/Logger';
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
  showLogs: boolean;
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
    this.handleGo = this.handleGo.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.downloadLogs = this.downloadLogs.bind(this);
    this.toggleLogs = this.toggleLogs.bind(this);
    this.resetGame = this.resetGame.bind(this);
    
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

  downloadLogs() {
    gameLogger.downloadLogs();
  }

  handleGo() {
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
    });
  }

  handleLeft() {
    const newLocation = turnLeft(this.state.robotState);
    gameLogger.logMovement('left', newLocation);
    
    this.setState({
      robotState: newLocation,
    });
  }

  handleRight() {
    const newLocation = turnRight(this.state.robotState);
    gameLogger.logMovement('right', newLocation);
    
    this.setState({
      robotState: newLocation,
    });
  }

  resetGame() {
    const newState = {
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
          <Greeting />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
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
            <Button 
              variant="outlined" 
              size="small" 
              onClick={this.toggleLogs}
              data-testid="toggle-logs-button"
            >
              Show Logs
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<DownloadIcon />} 
              onClick={this.downloadLogs}
              data-testid="download-logs-button"
            >
              Download Logs
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
        <div className="keyboard-controls">
          <p>Keyboard controls: Arrow keys or WASD, Space to move forward, L to toggle logs</p>
        </div>
        
        {this.renderLogs()}
      </MainDashboard>
    );
  }
}
