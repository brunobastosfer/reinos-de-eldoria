import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 'Bruno Bastos' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'bruno@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'Brazil' })
  @IsString()
  nacionality: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha em texto puro (será criptografada)',
  })
  @IsString()
  password: string;
}
