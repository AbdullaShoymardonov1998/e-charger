import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from '@prisma/client';
import { CustomerGuard } from '../auth/guards/customer.guards';
import { AdminGuard } from '../auth/guards/admin.guards';

@ApiBearerAuth()
@ApiTags('Customer')
@Controller({ path: 'customers', version: '1' })
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ description: 'Get all Customers' })
  @ApiResponse({ type: CustomerDto })
  getAllCustomers(): Promise<CustomerDto[]> {
    return this.customerService.getAllCustomers();
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard, CustomerGuard)
  @ApiOperation({ description: 'Get Customer by access token' })
  @ApiResponse({ type: CustomerDto })
  getCustomerProfile(@Req() req: any): Promise<CustomerDto> {
    return this.customerService.getCustomerById(req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, CustomerGuard)
  @ApiOperation({ description: 'Update Customer by Id' })
  @ApiResponse({ type: CustomerDto })
  updateCustomer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() customerDetails: CustomerDto,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, customerDetails);
  }
}
