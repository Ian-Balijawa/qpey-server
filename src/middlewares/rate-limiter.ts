import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';

const ONE_MINUTE = 1 * 60 * 1000; // 1 minute

const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: ONE_MINUTE,
	max: 5,
});

export { limiter };
