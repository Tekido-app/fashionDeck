/**
 * Rate Limiting Guard
 * 
 * Implements rate limiting using Redis to prevent abuse.
 * Limits: 10 requests per minute per IP address.
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../../redis/cache.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly logger = new Logger(RateLimitGuard.name);
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    this.windowMs = this.configService.get<number>('RATE_LIMIT_WINDOW_MS', 60000); // 1 minute
    this.maxRequests = this.configService.get<number>('RATE_LIMIT_MAX_REQUESTS', 10);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = this.getClientIp(request);

    if (!ip) {
      this.logger.warn('Unable to determine client IP, allowing request');
      return true;
    }

    const key = `rate_limit:${ip}`;
    const currentCount = await this.getCurrentCount(key);

    if (currentCount >= this.maxRequests) {
      this.logger.warn(`Rate limit exceeded for IP: ${ip}`);
      
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Too many requests. Please try again later.',
          error: 'Too Many Requests',
          retryAfter: Math.ceil(this.windowMs / 1000), // seconds
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Increment counter
    await this.incrementCount(key);

    // Add rate limit headers to response
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-RateLimit-Limit', this.maxRequests);
    response.setHeader('X-RateLimit-Remaining', this.maxRequests - currentCount - 1);
    response.setHeader('X-RateLimit-Reset', Date.now() + this.windowMs);

    return true;
  }

  /**
   * Get current request count for IP
   */
  private async getCurrentCount(key: string): Promise<number> {
    const count = await this.cacheService.get<number>(key);
    return count || 0;
  }

  /**
   * Increment request count for IP
   */
  private async incrementCount(key: string): Promise<void> {
    const current = await this.getCurrentCount(key);
    const ttl = Math.ceil(this.windowMs / 1000); // Convert to seconds
    
    await this.cacheService.set(key, current + 1, ttl);
  }

  /**
   * Extract client IP from request
   */
  private getClientIp(request: any): string | null {
    // Check various headers for IP (in order of preference)
    const ip =
      request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      request.headers['x-real-ip'] ||
      request.connection?.remoteAddress ||
      request.socket?.remoteAddress ||
      null;

    return ip;
  }
}
