import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from './type/usersResponse.interface';
import { UserLoginDto } from './dto/userLogin.dto';
import  type { authRequest } from '@/types/expressRequest.interface';
import { User } from './decorators/user.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto):Promise<any>{
    return await this.usersService.createUser(createUserDto)
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async userLogin(@Body('user') userLoginDto: UserLoginDto):Promise<IUserResponse>{
    const user= await this.usersService.userLogin(userLoginDto)

    return this.usersService.generateUserResponse(user)
  }

  @Get('users')
  async getCurrentUser(@User() user): Promise<IUserResponse>{
    return this.usersService.generateUserResponse(user)
  }
}
