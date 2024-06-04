import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // IMPORTAMOS EL MODULO QUE NOS PERMITE LEER EL ARCHIVO .ENV
import { AppController } from './app.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
/* import { lastValueFrom } from 'rxjs'; */
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments'
import config from './config'

const API_KEY = '123456'; // ADEMAS DE INYECTAR CLASES O SERVICIOS EN CONTROLADORES PODEMOS INYECTAR VALORES UNICOS.
const API_KEY_PROD = 'PROD12312';
@Module({
  imports: [
    ConfigModule.forRoot({ // LE INDICAMOS A NEST QUE LEA NUESTRO ARCHIVO .ENV Y ADEMAS LE DECIMOS QUE TIENE UN SCOPE GLOBAL, ES DECIR QUE PUEDE SER UTILIZADO EN TODA LA APP.
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // ESTO TAMBIEN NOS EVITA CREAR LAS VARIABLES DE ENTORNO UNA A UNA CUANDO USABAMOS USEVALUE.
      load: [config], // HEMOS CARGADO LA CONFIGURACION DE TIPADO DE NUESTRAS VARIABLES DE ENTORNO
      isGlobal: true,
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, // ESTA ES LA FORMA DE ENVIAR ESOS VALORES PARA INYECTAR
    },
    /*  {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');  // USE FACTORY NOS PERMITE CREAR PROVIDERS QUE TENGAN CIERTAS REGLAS (ASINCRONISMOS Y ADEMAS PERMITE INYECTAR DEPENDENCIAS EXTERNAS).
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    }, */
  ],
})
export class AppModule {}
