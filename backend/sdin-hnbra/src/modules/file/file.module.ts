import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import { SubSessionModule } from '../SubSession/sub-session.module';
import { FileValidator } from './validator/file.service.validator';
import { UsersModule } from '../users/users.module';
import { UserPermissionModule } from '../userPermission/user-permission.module';

@Module({
    imports: [
        SequelizeModule.forFeature([File]),
        SubSessionModule,  // Importa o SubSessionModule para resolver dependências
        UsersModule,
        UserPermissionModule,
    ],
    controllers: [FileController],
    providers: [FileService, FileValidator],
    exports: [FileService]
})
export class FileModule { }
