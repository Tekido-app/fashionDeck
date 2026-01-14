import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { validate } from './config/env.validation';
import { loggerConfig } from './config/logger.config';
import { DatabaseModule } from './modules/database/database.module';
import { RedisModule } from './modules/redis/redis.module';
import { QueueModule } from './modules/queue/queue.module';
import { HttpModule } from './modules/http/http.module';
import { HealthModule } from './modules/health/health.module';
import { QueryModule } from './modules/query/query.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { OutfitModule } from './modules/outfit/outfit.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env.local', '.env'],
    }),

    // Logging
    WinstonModule.forRoot(
      loggerConfig(process.env.NODE_ENV !== 'production')
    ),

    // Core Modules
    DatabaseModule,
    RedisModule,
    QueueModule,
    HttpModule,

    // Feature Modules
    HealthModule,
    QueryModule,
    MarketplaceModule,
    OutfitModule,
  ],
})
export class AppModule {}
