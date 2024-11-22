import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubSessionController } from './sub-session.controller';
import { Session } from 'src/repository/models/session.model';
import { SubSessionService } from './sub-session.service';
import { SubSession } from 'src/repository/models/subSession.model ';
import { SessionModule } from '../session/session.module';

@Module({
    imports: [
        SequelizeModule.forFeature([SubSession, Session]),
        SessionModule,
    ],
    controllers: [SubSessionController],
    providers: [SubSessionService],
})
export class SubSessionModule { }
