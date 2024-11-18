import { Controller, Post, Body } from '@nestjs/common';
import { DivisionService } from './division.service';
import { Division } from 'src/repository/models/division.model';

@Controller('divisions')
export class DivisionController {
    constructor(private readonly divisionService: DivisionService) { }

    @Post()
    async create(@Body() createDivision: { nameDivision: string; status: string }): Promise<Division> {
        return this.divisionService.createDivision(createDivision.nameDivision, createDivision.status);
    }
}
