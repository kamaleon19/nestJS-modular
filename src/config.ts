import { registerAs } from '@nestjs/config';   // CREAMOS UN ARCHIVO PARA TIPAR NUESTRAS VARIABLES DE ENTORNO Y ASI EVITAR ERRORES DE TYPO

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
  };
});
