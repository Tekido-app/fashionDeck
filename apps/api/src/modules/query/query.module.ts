import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { MLServiceClient } from './ml-service.client';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { RedisModule } from '../redis/redis.module';
import { MarketplaceModule } from '../marketplace/marketplace.module';

@Module({
  imports: [
    HttpModule,
    RedisModule,
    MarketplaceModule,
  ],
  controllers: [QueryController],
  providers: [
    QueryService,
    MLServiceClient,
    RateLimitGuard,
  ],
  exports: [QueryService, MLServiceClient],
})
export class QueryModule {}
