import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as dotenv from 'dotenv';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';

dotenv.config();

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TTL }
    })
  ],
  controllers: [AuthController],
  providers: [JwtAuthGuard, JwtStrategy, AuthService, RolesGuard],
  exports: [JwtAuthGuard, JwtStrategy, AuthService, RolesGuard],
})
export class AuthModule { }
