import { PrismaService } from '@/core/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/createStation.dto';
import { Station } from '@prisma/client';
import { UpdateStationDto } from './dto/updateStation.dto';
import { StationDto } from './dto/station.dto';

@Injectable()
export class StationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createStation(stationDetails: CreateStationDto): Promise<Station> {
    return this.prisma.station.create({
      data: {
        name: stationDetails.name,
        address: stationDetails.address,
        longtitude: stationDetails.longtitude,
        latitude: stationDetails.latitude,
        openTime: stationDetails.openTime,
        closeTime: stationDetails.closeTime,
        owner: {
          connect: {
            id: stationDetails.ownerId,
          },
        },
      },
    });
  }

  async getAllUserStations(userId: string): Promise<StationDto[]> {
    return this.prisma.station.findMany({
      where: {
        ownerId: userId,
        isDeleted: false,
      },
    });
  }

  async getStationById(stationId: string): Promise<Station> {
    const station = await this.prisma.station.findFirst({
      where: {
        id: stationId,
        isDeleted: false,
      },
      include: {
        chargers: true,
      },
    });

    if (!station) {
      throw new HttpException(
        'Station with given ID is Not Found',
        HttpStatus.NOT_FOUND,
      );
    }

    return station;
  }

  async updateStations(
    stationId: string,
    stationDetails: UpdateStationDto,
  ): Promise<Station> {
    await this.getStationById(stationId);
    return this.prisma.station.update({
      where: { id: stationId },
      data: {
        name: stationDetails.name,
        address: stationDetails.address,
        longtitude: stationDetails.longtitude,
        latitude: stationDetails.latitude,
        openTime: stationDetails.openTime,
        closeTime: stationDetails.closeTime,
        updatedAt: new Date(),
      },
    });
  }

  async deleteStations(stationId: string): Promise<Station> {
    await this.getStationById(stationId);
    const deleteStation = await this.prisma.station.update({
      where: {
        id: stationId,
      },
      data: {
        isDeleted: true,
      },
    });

    return deleteStation;
  }
}
