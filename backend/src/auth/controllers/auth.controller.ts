import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserDocument } from '../schemas/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(201)
  @Post('signin')
  async signin(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.signin(loginDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<UserDocument[]> {
    return this.authService.getAllUsers();
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string): Promise<UserDocument> {
    return this.authService.getUserById(id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.authService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.authService.deleteUser(id);
  }
}
