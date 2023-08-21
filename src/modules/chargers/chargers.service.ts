import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChargerDto } from './dto/create-charger.dto';
import { Charger } from '@prisma/client';
import { PrismaService } from '@/core/prisma/prisma.service';
import { updateChargerDto } from './dto/update-charger.dto';

@Injectable()
export class ChargersService {
  constructor(private readonly prisma: PrismaService) {}
  async createChargers(chargerDetails: CreateChargerDto): Promise<Charger> {
    return this.prisma.charger.create({
      data: {
        name: chargerDetails.name,
        station: {
          connect: {
            id: chargerDetails.stationId,
          },
        },
      },
    });
  }

  async getAllChargers(): Promise<Charger[]> {
    return this.prisma.charger.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  async getChargerById(id: string): Promise<Charger> {
    const charger = await this.prisma.charger.findFirst({
      where: { id, isDeleted: false },
    });

    if (!charger) {
      throw new HttpException(
        'Charger with given id is not Found',
        HttpStatus.NOT_FOUND,
      );
    }

    return charger;
  }

  async updateChargerById(
    chargerId: string,
    chargerDetails: updateChargerDto,
  ): Promise<Charger> {
    await this.getChargerById(chargerId);
    return this.prisma.charger.update({
      where: { id: chargerId },
      data: {
        name: chargerDetails.name,
        updatedAt: new Date(),
      },
    });
  }

  async deleteChargerById(chargerId: string): Promise<Charger> {
    await this.getChargerById(chargerId);
    const deleteStation = await this.prisma.charger.update({
      where: {
        id: chargerId,
      },
      data: {
        isDeleted: true,
      },
    });
    return deleteStation;
  }
}
