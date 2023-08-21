import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { UserGuard } from '@/modules/auth/guards/user.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { AdminGuard } from '@/modules/auth/guards/admin.guards';

@ApiBearerAuth()
@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ description: 'Get user profile' })
  @ApiResponse({ type: UserDto })
  getProfile(@Req() req: any): Promise<UserDto> {
    return this.userService.getProfile(req.user.id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/owner')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ description: 'Create owner' })
  @ApiResponse({ type: UserDto })
  createOwner(@Body() ownerDetails: CreateOwnerDto) {
    return this.userService.createOwner(ownerDetails);
  }
}
