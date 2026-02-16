import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QueryController } from './query.controller';
import { MLServiceController } from './ml-service.controller';
import { QueryService } from './query.service';
import { MLServiceClient } from './ml-service.client';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { RedisModule } from '../redis/redis.module';
import { MarketplaceModule } from '../marketplace/marketplace.module';
import { OutfitModule } from '../outfit/outfit.module';

@Module({
  imports: [
    HttpModule,
    RedisModule,
    MarketplaceModule,
    forwardRef(() => OutfitModule),
  ],
  controllers: [QueryController, MLServiceController],
  providers: [
    QueryService,
    MLServiceClient,
    RateLimitGuard,
  ],
  exports: [QueryService, MLServiceClient],
})
export class QueryModule {}
