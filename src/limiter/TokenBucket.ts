export class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRatePerSec: number
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  take(): boolean {
    this.refill();
    if (this.tokens < 1) return false;
    this.tokens -= 1;
    return true;
  }

  getRemaining(): number {
    this.refill();
    return Math.floor(this.tokens);
  }

  getResetTimeMs(): number {
    // Full refill time (approx)
    const missing = this.capacity - this.tokens;
    const seconds = missing / this.refillRatePerSec;
    return Date.now() + seconds * 1000;
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;

    const refillAmount = elapsed * this.refillRatePerSec;
    this.tokens = Math.min(this.capacity, this.tokens + refillAmount);

    this.lastRefill = now;
  }
}
