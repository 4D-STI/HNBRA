import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import { SubSessionModule } from '../subSession/sub-session.module';
import { FileValidator } from './validator/file.service.validator';

@Module({
    imports: [
        SequelizeModule.forFeature([File]),
        SubSessionModule,  // Importa o SubSessionModule para resolver dependências
    ],
    controllers: [FileController],
    providers: [FileService, FileValidator],
    exports: [FileService]
})
export class FileModule { }
