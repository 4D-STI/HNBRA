import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionController } from './session.controller';
import { Session } from 'src/repository/models/session.model';
import { SessionService } from './session.service';

@Module({
    imports: [SequelizeModule.forFeature([Session])],
    controllers: [SessionController],
    providers: [SessionService],
})
export class SessionModule { }
