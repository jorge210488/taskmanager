import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ name: string; email: string }> {
    const { email } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('El Email ya esta en uso');
    }

    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();

    return {
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async signin(
    loginDto: LoginDto,
  ): Promise<{ token: string; name: string; email: string; userId: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const token = this.jwtService.sign({ userId: user._id });

    return {
      token,
      name: user.name,
      email: user.email,
      userId: user._id.toString(),
    };
  }

  async getAllUsers(): Promise<
    { name: string; email: string; userId: string }[]
  > {
    const users = await this.userModel.find();
    return users.map((user) => ({
      name: user.name,
      email: user.email,
      userId: user._id.toString(),
    }));
  }

  async getUserById(
    id: string,
  ): Promise<{ name: string; email: string; userId: string }> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      name: user.name,
      email: user.email,
      userId: user._id.toString(),
    };
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; name: string; email: string; userId: string }> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      message: 'Datos actualizados exitosamente',
      name: updatedUser.name,
      email: updatedUser.email,
      userId: updatedUser._id.toString(),
    };
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return { message: 'Usuario eliminado exitosamente' };
  }
}
