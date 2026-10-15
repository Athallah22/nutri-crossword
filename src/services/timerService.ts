export const FIXED_ROUND_DURATION = 10;

/**
 * Generates a round duration in seconds.
 * Default: 10 seconds flat.
 */
export function randomRoundDuration(min = 10, max = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface TimerCallbacks {
  onTick?: (remainingSeconds: number, progressRatio: number) => void;
  onComplete?: () => void;
}

export class MonotonicTimer {
  private timeoutId: number | null = null;
  private intervalId: number | null = null;
  private targetDeadlineMs = 0;
  private totalDurationSeconds = 0;
  private isRunning = false;

  public start(durationSeconds: number, callbacks: TimerCallbacks): void {
    this.stop();
    this.totalDurationSeconds = durationSeconds;
    this.targetDeadlineMs = performance.now() + durationSeconds * 1000;
    this.isRunning = true;

    // Initial tick
    callbacks.onTick?.(durationSeconds, 1.0);

    // High frequency interval (every 100ms) for smooth progress and tab focus recovery
    this.intervalId = window.setInterval(() => {
      if (!this.isRunning) return;

      const now = performance.now();
      const remainingMs = Math.max(0, this.targetDeadlineMs - now);
      const remainingSec = Math.ceil(remainingMs / 1000);
      const progressRatio = Math.max(0, Math.min(1, remainingMs / (this.totalDurationSeconds * 1000)));

      callbacks.onTick?.(remainingSec, progressRatio);

      if (now >= this.targetDeadlineMs) {
        this.stop();
        callbacks.onComplete?.();
      }
    }, 100);

    // Absolute timeout backup
    this.timeoutId = window.setTimeout(() => {
      if (this.isRunning) {
        this.stop();
        callbacks.onComplete?.();
      }
    }, durationSeconds * 1000);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}
