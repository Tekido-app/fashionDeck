/**
 * Marketplace Module
 * 
 * Provides marketplace integration for Amazon and Flipkart.
 */

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarketplaceService } from './marketplace.service';
import { AmazonAdapter } from './adapters/amazon.adapter';
import { FlipkartAdapter } from './adapters/flipkart.adapter';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    HttpModule,
    RedisModule,
  ],
  providers: [
    MarketplaceService,
    AmazonAdapter,
    FlipkartAdapter,
  ],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
