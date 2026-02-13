import { TokenBucket } from "../limiter/TokenBucket";

export class MemoryStore {
  private buckets = new Map<string, TokenBucket>();

  getBucket(key: string, maxRequests: number, windowMs: number) {
    if (!this.buckets.has(key)) {
      const refillRate = maxRequests / (windowMs / 1000);
      this.buckets.set(key, new TokenBucket(maxRequests, refillRate));
    }

    return this.buckets.get(key)!;
  }
}
