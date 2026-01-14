/**
 * Query Request DTO
 * 
 * Validates incoming user query requests.
 */

import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class QueryRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Prompt is required' })
  @MinLength(10, { message: 'Prompt must be at least 10 characters long' })
  @MaxLength(200, { message: 'Prompt must not exceed 200 characters' })
  prompt: string;
}
