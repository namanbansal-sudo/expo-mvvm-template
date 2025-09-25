type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private isDevelopment = __DEV__;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
    };

    this.logs.push(entry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    if (this.isDevelopment) {
      const consoleMethod = level === 'debug' ? 'log' : level;
      console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data || '');
    }
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const logger = Logger.getInstance();

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private marks: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMark(name: string) {
    this.marks.set(name, Date.now());
    logger.debug(`Performance mark started: ${name}`);
  }

  endMark(name: string): number | null {
    const startTime = this.marks.get(name);
    if (startTime) {
      const duration = Date.now() - startTime;
      this.marks.delete(name);
      logger.debug(`Performance mark ended: ${name} (${duration}ms)`);
      return duration;
    }
    logger.warn(`Performance mark not found: ${name}`);
    return null;
  }

  measure(name: string, startMark: string, endMark: string): number | null {
    // This would use performance.mark() and performance.measure() in a real implementation
    logger.debug(`Performance measurement: ${name} (from ${startMark} to ${endMark})`);
    return null;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Error boundary helper
export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  captureError(error: Error, context?: string) {
    logger.error(`Error captured${context ? ` in ${context}` : ''}:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    // In a real app, you would send this to an error reporting service
    // like Sentry, LogRocket, etc.
  }

  captureWarning(message: string, data?: any) {
    logger.warn(`Warning captured: ${message}`, data);
  }
}

export const errorHandler = ErrorHandler.getInstance();

// Development helpers
export const devUtils = {
  logger,
  performanceMonitor,
  errorHandler,

  // Clear all logs
  clearLogs: () => logger.clearLogs(),

  // Export logs as string
  exportLogs: () => logger.exportLogs(),

  // Get logs by level
  getLogs: (level?: LogLevel) => logger.getLogs(level),

  // Measure function execution time
  measureExecution: async <T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<{ result: T; duration: number }> => {
    const startTime = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - startTime;
      logger.debug(`Function ${name} executed in ${duration}ms`);
      return { result, duration };
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error(`Function ${name} failed after ${duration}ms:`, error);
      throw error;
    }
  },
};
