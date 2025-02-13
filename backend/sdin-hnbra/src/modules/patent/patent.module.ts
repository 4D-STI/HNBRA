import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patent } from 'src/repository/models/patent.model';
import { PatentController } from './patent.controller';
import { PatentService } from './patent.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Patent]),
        UsersModule,
    ],
    controllers: [PatentController],
    providers: [PatentService],
})
export class PatentModule { }
