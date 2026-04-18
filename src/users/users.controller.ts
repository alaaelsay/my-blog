import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from './type/usersResponse.interface';
import { UserLoginDto } from './dto/userLogin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto):Promise<any>{
    return await this.usersService.createUser(createUserDto)
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async userLogin(@Body('user') userLoginDto: UserLoginDto):Promise<IUserResponse>{
    const user= await this.usersService.userLogin(userLoginDto)

    return this.usersService.generateUserResponse(user)
  }
}
