import { gameLogger, LogType } from './Logger';

describe('Logger', () => {
  beforeEach(() => {
    gameLogger.clearLogs();
  });

  it('should log events correctly', () => {
    // Mock console.log
    const originalConsoleLog = console.log;
    console.log = jest.fn();

    // Enable debug mode for testing
    gameLogger.setDebugMode(true);

    // Log different types of events
    gameLogger.logGameStart();
    gameLogger.logMovement('forward', { row: 1, col: 2, direction: 0 });
    gameLogger.logScore(5, { row: 1, col: 2 });
    gameLogger.logError(new Error('Test error'));

    // Get all logs
    const logs = gameLogger.getLogs();

    // Check log count
    expect(logs.length).toBe(4);

    // Check log types
    expect(logs[0].type).toBe(LogType.GAME_START);
    expect(logs[1].type).toBe(LogType.MOVEMENT);
    expect(logs[2].type).toBe(LogType.SCORE);
    expect(logs[3].type).toBe(LogType.ERROR);

    // Check log messages
    expect(logs[0].message).toBe('Game started');
    expect(logs[1].message).toBe('Robot moved forward');
    expect(logs[2].message).toBe('Score increased to 5');
    expect(logs[3].message).toBe('Error: Test error');

    // Check console.log was called
    expect(console.log).toHaveBeenCalledTimes(4);

    // Restore console.log
    console.log = originalConsoleLog;
  });

  it('should limit logs to maximum size', () => {
    // Set small max logs for testing
    const originalMaxLogs = (gameLogger as any).maxLogs;
    (gameLogger as any).maxLogs = 3;

    // Add more logs than the maximum
    gameLogger.logGameStart();
    gameLogger.logMovement('forward', { row: 0, col: 0, direction: 0 });
    gameLogger.logMovement('left', { row: 0, col: 0, direction: 3 });
    gameLogger.logMovement('right', { row: 0, col: 0, direction: 0 });

    // Get all logs
    const logs = gameLogger.getLogs();

    // Check log count is limited to max
    expect(logs.length).toBe(3);

    // Check oldest log was removed
    expect(logs[0].message).not.toBe('Game started');
    expect(logs[0].message).toBe('Robot moved forward');

    // Restore original max logs
    (gameLogger as any).maxLogs = originalMaxLogs;
  });

  it('should clear logs', () => {
    // Add some logs
    gameLogger.logGameStart();
    gameLogger.logMovement('forward', { row: 0, col: 0, direction: 0 });

    // Clear logs
    gameLogger.clearLogs();

    // Check logs are empty
    expect(gameLogger.getLogs().length).toBe(0);
  });
}); 