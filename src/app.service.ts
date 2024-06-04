import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config'

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config> // INYECTAMOS NUESTRO ARCHIVO CONFIG QUE CONTIENE LAS VARIABLES DE ENTORNO TIPADAS.
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey // HEMOS APLICADO VARIABLES DE ENTORNO DINAMICAS, ES DECIR, DEPENDE EN EL ENTORNO QUE NOS ENCONTREMOS YA SEA DESARROLLO, PRODUCCION, ETC NOS DEVOLVERA EL VALOR ACORDE AL ENTORNO.
    const db = this.configService.database.name
    return `Hello World! ${apiKey} ${db}`;
  }
}
