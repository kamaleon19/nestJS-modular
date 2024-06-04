import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // IMPORTAMOS EL MODULO QUE NOS PERMITE INYECTAR LAS VARIABLES DE ENTORNO
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from 'src/products/services/products.service'; // IMPORTAMOS UN SERVICIO DE OTRO MODULO Y LO USAMOS EN OTRO SERVICIO, EN ESTE CASO EL SERVICIO DE USERS.

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService, // INYECTAMOS LAS DEPENDENCIAS EN EL CONSTRUCTOR
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'joaquin osores',
      email: 'sdasdja@gmail.com',
      password: '123456',
      rol: 'admin',
    },
  ];

  findAll() {
    const apiKey= this.configService.get('API_KEY') // AQUI PODEMOS ACCEDER A LAS VARIABLES DE ENTORNO QUE HAYAMOS CREADO.
    const db = this.configService.get('DATABASE_NAME')
    console.log(apiKey, db);

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const userId = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...userId,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
