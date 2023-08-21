import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class updateChargerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Charger Name', example: 'Charger-1' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Charger Voltage', example: '110V' })
  voltage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Station Id',
    example: 'e921e0d5-7a8a-4464-bbad-78df82645542',
  })
  stationId: string;
}
