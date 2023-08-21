import { ApiProperty } from '@nestjs/swagger';

export class ChargerDto {
  @ApiProperty({ description: 'Charger Name' })
  name: string;

  @ApiProperty({ description: 'Charger Voltage' })
  voltage: string;

  @ApiProperty({ description: 'Charger Id' })
  stationId: string;
}
