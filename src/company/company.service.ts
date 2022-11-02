import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';

dotenv.config();

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto, file: Express.Multer.File) {
    return this.prisma.company.create({
      data: {
        ...data,
        logoPath: `${process.env.URL}/files/logos/${file.filename}`,
      },
    });
  }

  async findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: number) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: UpdateCompanyDto,
    logo: Express.Multer.File | undefined,
  ) {
    if (logo) {
      fs.unlinkSync(await this.getLogoPath(id));
      data.logoPath = `${process.env.URL}/files/logos/${logo.filename}`;
    }
    return await this.prisma.company.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.company.delete({ where: { id } });
  }

  private async getLogoPath(id: number): Promise<string> {
    const { logoPath } = await this.prisma.company.findUniqueOrThrow({
      where: { id },
    });

    return join(
      process.cwd(),
      'uploads',
      'logos',
      logoPath.substring(logoPath.search('logos/') + 6),
    );
  }
}
