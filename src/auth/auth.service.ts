import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { Role, User } from '@prisma/client';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    let user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);

    return this.makeJwtObj(user);
  }

  async register({ email, password }: RegisterUserDto) {
    password = await bcrypt.hash(password, process.env.ROUNDS);
    try {
      const user = await this.prisma.user.create({ data: { email, password, role: Role.USER } });
      return this.makeJwtObj(user);
    } catch {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT)
    }
  }

  private makeJwtObj({ email, role }: User) {
    return {
      'ttl': process.env.JWT_TTL,
      'token': this.jwtService.sign({
        user: {
          email,
          role
        }
      })
    };
  }
}
