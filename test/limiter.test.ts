import { describe, it, expect } from "vitest";
import { RateLimiter } from "../src/limiter/RateLimiter";

describe("PulseLimiter", () => {
  it("blocks after max requests", () => {
    const limiter = new RateLimiter({
      windowMs: 60000,
      maxRequests: 3
    });

    expect(limiter.check("user1").allowed).toBe(true);
    expect(limiter.check("user1").allowed).toBe(true);
    expect(limiter.check("user1").allowed).toBe(true);

    // 4th request should be blocked
    expect(limiter.check("user1").allowed).toBe(false);
  });
});
