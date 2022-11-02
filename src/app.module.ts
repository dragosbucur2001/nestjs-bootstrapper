import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './company/company.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PrismaModule, AuthModule, CompanyModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
