import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateChargerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Charger Name', example: 'Charger-1' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'Station Id',
    example: 'e921e0d5-7a8a-4464-bbad-78df82645542',
  })
  stationId: string;
}
