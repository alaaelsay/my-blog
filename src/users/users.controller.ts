import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @Post()
  async createUser(@Body('user') createUserDto: CreateUserDto):Promise<any>{
    return await this.usersService.createUser(createUserDto)
  }
}
