import { IsInt, IsNumber } from 'class-validator';

export class CreatePlanDto {
  @IsInt()
  days: number;

  @IsNumber()
  price;
}
