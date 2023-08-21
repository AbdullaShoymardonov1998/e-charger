import { PrismaService } from '@/core/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(customerDetails: CreateCustomerDto): Promise<Customer> {
    return this.prisma.customer.create({
      data: {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        phone: customerDetails.phone,
      },
    });
  }

  async getAllCustomers(): Promise<CustomerDto[]> {
    return this.prisma.customer.findMany();
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findFirst({
      where: { id, isDeleted: false, isActive: true },
    });
    if (!customer) {
      throw new HttpException(
        'Customer with given ID is not Found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return customer;
  }

  async getCustomerByPhone(phone: string): Promise<Customer> {
    const customer = await this.prisma.customer.findFirst({
      where: { phone },
    });
    return customer;
  }

  async updateCustomer(
    id: string,
    customerDetails: CustomerDto,
  ): Promise<Customer> {
    await this.getCustomerById(id);
    return this.prisma.customer.update({
      where: { id },
      data: {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        updatedAt: new Date(),
      },
    });
  }
}
