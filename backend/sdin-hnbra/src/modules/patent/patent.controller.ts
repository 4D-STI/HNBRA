import { Controller, Get } from '@nestjs/common';
import { PatentService } from './patent.service';

@Controller('patent')
export class PatentController {

    constructor(private readonly patentService: PatentService) { }

    @Get()
    async getAllSession() {
        return this.patentService.getPatent();
    }

}
