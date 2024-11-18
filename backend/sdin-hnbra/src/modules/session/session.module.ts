import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionController } from './session.controller';
import { Session } from 'src/repository/models/session.model';
import { SessionService } from './session.service';
import { DivisionModule } from '../divison/division.module';

@Module({
    imports: [SequelizeModule.forFeature([Session]), DivisionModule],
    controllers: [SessionController],
    providers: [SessionService],
})
export class SessionModule { }
