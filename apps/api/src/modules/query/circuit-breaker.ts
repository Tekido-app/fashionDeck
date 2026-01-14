/**
 * Circuit Breaker
 * 
 * Implements circuit breaker pattern to prevent cascading failures.
 * States: CLOSED (normal) → OPEN (failing) → HALF_OPEN (testing)
 */

export enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

export interface CircuitBreakerOptions {
  failureThreshold: number; // Number of failures before opening
  resetTimeout: number; // Time in ms before attempting to close
  monitoringWindow: number; // Time window in ms to track failures
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount = 0;
  private lastFailureTime: number | null = null;
  private nextAttemptTime: number | null = null;
  private failures: number[] = []; // Timestamps of failures

  constructor(private readonly options: CircuitBreakerOptions) {}

  /**
   * Check if circuit allows request
   */
  canExecute(): boolean {
    // Clean up old failures outside monitoring window
    const now = Date.now();
    this.failures = this.failures.filter(
      timestamp => now - timestamp < this.options.monitoringWindow
    );

    // Update state based on time
    if (this.state === CircuitState.OPEN && this.nextAttemptTime) {
      if (now >= this.nextAttemptTime) {
        this.state = CircuitState.HALF_OPEN;
        this.failureCount = 0;
      }
    }

    return this.state !== CircuitState.OPEN;
  }

  /**
   * Record successful execution
   */
  recordSuccess(): void {
    this.failureCount = 0;
    this.failures = [];
    
    if (this.state === CircuitState.HALF_OPEN) {
      this.state = CircuitState.CLOSED;
      this.nextAttemptTime = null;
    }
  }

  /**
   * Record failed execution
   */
  recordFailure(): void {
    const now = Date.now();
    this.failures.push(now);
    this.failureCount++;
    this.lastFailureTime = now;

    // Check if we should open the circuit
    if (this.failures.length >= this.options.failureThreshold) {
      this.state = CircuitState.OPEN;
      this.nextAttemptTime = now + this.options.resetTimeout;
    }
  }

  /**
   * Get current circuit state
   */
  getState(): CircuitState {
    return this.state;
  }

  /**
   * Get failure count in current window
   */
  getFailureCount(): number {
    return this.failures.length;
  }

  /**
   * Reset circuit to closed state
   */
  reset(): void {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.failures = [];
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }
}
