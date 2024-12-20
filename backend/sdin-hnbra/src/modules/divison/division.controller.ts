import { Controller, Post, Body, Get } from '@nestjs/common';
import { DivisionService } from './division.service';
import { Division } from 'src/repository/models/division.model';

@Controller('divisions')
export class DivisionController {
    constructor(private readonly divisionService: DivisionService) { }

    @Post()
    async create(@Body() createDivision: { nameDepartament: string; status: string }): Promise<Division> {
        return this.divisionService.createDivision(createDivision.nameDepartament, createDivision.status);
    }

    @Get()
    async getAllDivision() {
        return this.divisionService.getDivision();
    }
}
