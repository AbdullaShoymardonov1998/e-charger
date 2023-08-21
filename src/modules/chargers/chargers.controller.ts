import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChargersService } from './chargers.service';
import { CreateChargerDto } from './dto/create-charger.dto';
import { Charger } from '@prisma/client';
import { updateChargerDto } from './dto/update-charger.dto';
import { ChargerDto } from './dto/charger.dto';
import { UserGuard } from '../auth/guards/user.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AdminGuard } from '../auth/guards/admin.guards';

@ApiBearerAuth()
@ApiTags('Charger')
@Controller({ path: 'chargers', version: '1' })
export class ChargersController {
  constructor(private readonly chargerService: ChargersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ description: 'Create User Charger' })
  @ApiResponse({ type: ChargerDto })
  createChargers(@Body() chargerDetails: CreateChargerDto): Promise<Charger> {
    return this.chargerService.createChargers(chargerDetails);
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ description: 'Get User Charger' })
  @ApiResponse({ type: ChargerDto })
  getAllChargers(): Promise<Charger[]> {
    return this.chargerService.getAllChargers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ description: 'Get User Charger by Id' })
  @ApiResponse({ type: ChargerDto })
  getChargerbyId(@Param('id', ParseUUIDPipe) id: string): Promise<Charger> {
    return this.chargerService.getChargerById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ description: 'Update User Charger by Id' })
  @ApiResponse({ type: ChargerDto })
  updateChargerById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() chargerDetails: updateChargerDto,
  ): Promise<Charger> {
    return this.chargerService.updateChargerById(id, chargerDetails);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ description: 'Delete User Station by Id' })
  @ApiResponse({ type: ChargerDto })
  deleteChargerById(@Param('id', ParseUUIDPipe) id: string): Promise<Charger> {
    return this.chargerService.deleteChargerById(id);
  }
}
