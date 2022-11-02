import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseInterceptors,
  UploadedFiles,
  ParseArrayPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Express } from 'express';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Auth(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('logo', {
      dest: 'uploads/logos/',
      limits: {
        fileSize: 100_000,
      },
    }),
  )
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.companyService.create(createCompanyDto, logo);
  }
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  @UseInterceptors(
    FilesInterceptor('logo', 1, {
      dest: 'uploads/logos/',
      limits: {
        fileSize: 100_000,
      },
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.companyService.update(id, updateCompanyDto, files[0]);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.remove(id);
  }
}
