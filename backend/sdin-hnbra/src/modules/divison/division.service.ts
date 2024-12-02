import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Division } from 'src/repository/models/division.model';

@Injectable()
export class DivisionService {
    constructor(
        @InjectModel(Division)
        private readonly divisionModel: typeof Division,
    ) { }

    async createDivision(nameDivision: string, status: string) {
        console.log("=================", nameDivision)
        console.log("=================", status)

        try {
            return await this.divisionModel.create({ nameDivision, status });
        } catch (error) {
            console.error("Erro ao criar divisão:", error);
            throw new BadRequestException('Erro ao criar divisão', error);
        }
    }

    async getDivision() {
        return this.divisionModel.findAll({ order: [['nameDivision', 'ASC']], });
    }

}
