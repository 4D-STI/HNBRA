import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
  constructor(
    private sequelize: Sequelize,
    private readonly configService: ConfigService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  getAllEnvVars(id: number): string {
    const allVars = {};
    const keys = this.configService;

    console.log(keys);

    return `ID is ${id}`;

  }
}
