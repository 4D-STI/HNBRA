import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { Information } from 'src/repository/models/information.model';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [SequelizeModule.forFeature([Information]), UsersModule],
    controllers: [InformationController],
    providers: [InformationService],
    exports: [SequelizeModule],
})
export class InformationModule { }
