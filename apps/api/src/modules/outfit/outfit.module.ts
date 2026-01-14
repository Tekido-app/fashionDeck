/**
 * Outfit Module
 * 
 * Handles outfit assembly, scoring, and ranking.
 */

import { Module } from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { QueryModule } from '../query/query.module';

@Module({
  imports: [QueryModule],
  providers: [OutfitService],
  exports: [OutfitService],
})
export class OutfitModule {}
