/**
 * Query Controller
 * 
 * Handles HTTP requests for outfit queries.
 * Main endpoint: POST /api/query
 */

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { QueryService } from './query.service';
import { QueryRequestDto } from './dto/query-request.dto';
import { QueryResponseDto } from './dto/query-response.dto';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { NoResultsError, ValidationError as CustomValidationError } from '@fashiondeck/utils';

@Controller('query')
export class QueryController {
  private readonly logger = new Logger(QueryController.name);

  constructor(private readonly queryService: QueryService) {}

  /**
   * POST /api/query
   * 
   * Process user query and return outfit recommendations
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RateLimitGuard)
  async query(
    @Body() queryRequest: QueryRequestDto,
    @Req() request: Request,
  ): Promise<QueryResponseDto> {
    const startTime = Date.now();
    const userIp = this.getClientIp(request);

    this.logger.log(`Query received from ${userIp}: "${queryRequest.prompt}"`);

    try {
      const result = await this.queryService.processQuery(
        queryRequest.prompt,
        userIp || undefined,
      );

      const totalTime = Date.now() - startTime;
      this.logger.log(`Query completed in ${totalTime}ms with ${result.count} results`);

      return result;

    } catch (error) {
      const totalTime = Date.now() - startTime;
      this.logger.error(`Query failed after ${totalTime}ms:`, error);

      // Handle specific error types
      if (error instanceof NoResultsError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
            error: 'No Results Found',
            suggestions: [
              'Try a different aesthetic or style',
              'Increase your budget',
              'Remove size restrictions',
            ],
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (error instanceof CustomValidationError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
            error: 'Validation Error',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // Handle timeout errors
      if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
        throw new HttpException(
          {
            statusCode: HttpStatus.GATEWAY_TIMEOUT,
            message: 'Request timed out. Please try again.',
            error: 'Gateway Timeout',
          },
          HttpStatus.GATEWAY_TIMEOUT,
        );
      }

      // Generic error
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while processing your query. Please try again.',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Extract client IP from request
   */
  private getClientIp(request: Request): string | null {
    const ip =
      request.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
      request.headers['x-real-ip']?.toString() ||
      request.socket?.remoteAddress ||
      null;

    return ip;
  }
}
