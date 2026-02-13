import { Request, Response, NextFunction } from "express";
import { RateLimiter } from "../limiter/RateLimiter";

export function pulseLimiter(options: {
  windowMs: number;
  maxRequests: number;
}) {
  const limiter = new RateLimiter(options);

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || "unknown";

    const result = limiter.check(key);

    if (!result.allowed) {
      const retryAfter = Math.ceil(
        (result.resetTime - Date.now()) / 1000
      );

      res.setHeader("Retry-After", retryAfter);

      return res.status(429).json({
        error: "Too Many Requests",
        message: "Rate limit exceeded",
        retryAfterSeconds: retryAfter
      });
    }

    next();
  };
}
