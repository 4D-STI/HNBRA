import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import { Scheduling } from 'src/repository/models/scheduling.model';
import { SubSessionModule } from '../SubSession/sub-session.module';
import { UsersModule } from '../users/users.module';
import { PatentModule } from '../patent/patent.module';
import { Patent } from 'src/repository/models/patent.model';
import { SchedulingValidator } from './validator/scheduling.service.validator';

@Module({
    imports: [
        SequelizeModule.forFeature([Scheduling, Patent]),
        UsersModule,
    ],
    controllers: [SchedulingController],
    providers: [SchedulingService,
        SchedulingValidator
    ],
    exports: [SchedulingService]
})
export class SchedulingModule { }
