/**
 * ML Service Controller
 * 
 * Provides endpoints for ML service status and diagnostics.
 */

import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { MLServiceClient } from './ml-service.client';

@Controller('ml')
export class MLServiceController {
  private readonly logger = new Logger(MLServiceController.name);

  constructor(private readonly mlServiceClient: MLServiceClient) {}

  /**
   * GET /api/ml/health
   * 
   * Check ML service health and circuit breaker status
   */
  @Get('health')
  @HttpCode(HttpStatus.OK)
  async getMLServiceHealth() {
    const isHealthy = await this.mlServiceClient.healthCheck();
    const circuitStatus = this.mlServiceClient.getCircuitBreakerStatus();

    return {
      mlService: {
        healthy: isHealthy,
        url: process.env.ML_SERVICE_URL || 'http://localhost:8000',
      },
      circuitBreaker: {
        state: circuitStatus.state,
        failureCount: circuitStatus.failureCount,
        isOpen: circuitStatus.isOpen,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * GET /api/ml/status
   * 
   * Get detailed ML service status
   */
  @Get('status')
  @HttpCode(HttpStatus.OK)
  async getMLServiceStatus() {
    const circuitStatus = this.mlServiceClient.getCircuitBreakerStatus();

    return {
      service: 'ML Service Client',
      version: '1.0.0',
      circuitBreaker: circuitStatus,
      configuration: {
        url: process.env.ML_SERVICE_URL || 'http://localhost:8000',
        timeout: process.env.ML_SERVICE_TIMEOUT || 5000,
        maxRetries: 3,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
