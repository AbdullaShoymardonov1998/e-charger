import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({
    description: 'Customer id',
    example: 'adb30e6d-a440-4ad9-9e1c-626158f6d245',
  })
  id: string;

  @ApiProperty({ description: 'Customer name', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Customer surname', example: 'Doe' })
  lastName: string;

  @ApiProperty({
    description: 'Customer phone number',
  })
  @ApiProperty({ description: 'Customer phone', example: '998901234567' })
  phone: string;

  @ApiProperty({ description: 'Customer balance', example: '0.0' })
  balance: number;

  @ApiProperty({
    description: 'Customer created at',
    example: '2023-06-23T11:22:10.167Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Customer updated at',
    example: '2023-06-23T11:22:10.167Z',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Customer is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Customer is deleted', example: false })
  isDeleted: boolean;
}
