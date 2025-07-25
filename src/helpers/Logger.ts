import { RobotState } from './DirectionManager';

export enum LogType {
  MOVEMENT = 'MOVEMENT',
  SCORE = 'SCORE',
  GAME_START = 'GAME_START',
  GAME_RESET = 'GAME_RESET',
  ERROR = 'ERROR'
}

export interface LogEntry {
  type: LogType;
  timestamp: number;
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs: number = 100;
  private debugMode: boolean = false;

  constructor() {
    // Check if we're in development mode
    this.debugMode = process.env.NODE_ENV === 'development';
  }

  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }

  public log(type: LogType, message: string, data?: any): void {
    const entry: LogEntry = {
      type,
      timestamp: Date.now(),
      message,
      data
    };

    this.logs.push(entry);

    // Keep logs under the maximum size
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console log in debug mode
    if (this.debugMode) {
      console.log(`[${type}] ${message}`, data || '');
    }
  }

  public logMovement(direction: string, robotState: RobotState): void {
    this.log(LogType.MOVEMENT, `Robot moved ${direction}`, { robotState });
  }

  public logScore(score: number, position: { row: number, col: number }): void {
    this.log(LogType.SCORE, `Score increased to ${score}`, { score, position });
  }

  public logGameStart(): void {
    this.log(LogType.GAME_START, 'Game started');
  }

  public logGameReset(): void {
    this.log(LogType.GAME_RESET, 'Game reset');
  }

  public logError(error: Error): void {
    this.log(LogType.ERROR, `Error: ${error.message}`, { error });
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public downloadLogs(): void {
    try {
      const logData = JSON.stringify(this.logs, null, 2);
      const blob = new Blob([logData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `explorer-bug-logs-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download logs:', error);
    }
  }
}

// Singleton instance
export const gameLogger = new Logger(); 