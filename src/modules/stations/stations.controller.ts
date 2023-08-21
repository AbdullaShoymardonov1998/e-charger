import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/createStation.dto';
import { Station } from '@prisma/client';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { UserGuard } from '@/modules/auth/guards/user.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StationDto } from './dto/station.dto';
import { AdminGuard } from '../auth/guards/admin.guards';

@ApiBearerAuth()
@ApiTags('Station')
@Controller({ path: 'stations', version: '1' })
export class StationsController {
  constructor(private readonly stationService: StationsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ description: 'Create Station' })
  @ApiResponse({ type: StationDto })
  createStation(@Body() stationDetails: CreateStationDto): Promise<Station> {
    return this.stationService.createStation(stationDetails);
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ description: 'Get User Stations' })
  @ApiResponse({ type: StationDto })
  getAllUserStations(@Req() req: any): Promise<StationDto[]> {
    return this.stationService.getAllUserStations(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ description: 'Get User Station by Id' })
  @ApiResponse({ type: StationDto })
  getStationById(
    @Param('id', ParseUUIDPipe) stationId: string,
  ): Promise<Station> {
    return this.stationService.getStationById(stationId);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ description: 'Update User Station by Id' })
  @ApiResponse({ type: StationDto })
  updateStations(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() stationDetails: CreateStationDto,
  ): Promise<Station> {
    return this.stationService.updateStations(id, stationDetails);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ description: 'Delete User Station by Id' })
  @ApiResponse({ type: StationDto })
  deleteStations(@Param('id', ParseUUIDPipe) id: string): Promise<Station> {
    return this.stationService.deleteStations(id);
  }
}
