import { ApiProperty } from '@nestjs/swagger';
export class StationDto {
  @ApiProperty({ description: 'Station Name' })
  name: string;

  @ApiProperty({ description: 'Station Address' })
  address: string;

  @ApiProperty({ description: 'Station Longtitude' })
  longtitude: string;

  @ApiProperty({ description: 'Station Latitude' })
  latitude: string;

  @ApiProperty({ description: 'Station Owner Id' })
  ownerId: string;

  @ApiProperty({ description: 'Station Opening Time' })
  openTime: string;

  @ApiProperty({ description: 'Station Closing Time' })
  closeTime: string;
}
