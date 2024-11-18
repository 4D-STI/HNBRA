import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { Division } from 'src/repository/models/division.model';

@Module({
    imports: [SequelizeModule.forFeature([Division])],
    controllers: [DivisionController],
    providers: [DivisionService],
    exports: [SequelizeModule],
})
export class DivisionModule { }
