import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('files')
export class FileController {
  @Get('logos/:id')
  getLogo(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const file = createReadStream(join(process.cwd(), 'uploads', 'logos', id));
    res.set({
      'Content-Type': 'image/png',
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });
    return new StreamableFile(file);
  }
}
