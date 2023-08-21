import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Station Name', example: 'Station 1' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Station Address',
    example: 'Tashkent, Uzbekistan',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Station Longtitude',
    example: '41.31675099072716',
  })
  longtitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Station Latitude',
    example: '69.24856586061459',
  })
  latitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Station Owner Id',
    example: '0656de38-568b-49ab-bf79-b6079bf0af79',
  })
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Station Opening Time', example: '09:00' })
  openTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Station Closing Time', example: '18:00' })
  closeTime: string;
}
