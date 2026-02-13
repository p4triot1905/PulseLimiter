import { MemoryStore } from "../store/MemoryStore";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

export class RateLimiter {
  private store: MemoryStore;
  private windowMs: number;
  private maxRequests: number;

  constructor(options: RateLimiterOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.store = new MemoryStore();
  }

  check(key: string): RateLimitResult {
    const bucket = this.store.getBucket(
      key,
      this.maxRequests,
      this.windowMs
    );

    const allowed = bucket.take();

    return {
      allowed,
      remaining: bucket.getRemaining(),
      resetTime: Date.now() + this.windowMs
    };
  }
}
