/**
 * Outfit Module
 * 
 * Handles outfit assembly, scoring, and ranking.
 */

import { Module, forwardRef } from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { QueryModule } from '../query/query.module';

@Module({
  imports: [forwardRef(() => QueryModule)],
  providers: [OutfitService],
  exports: [OutfitService],
})
export class OutfitModule {}
