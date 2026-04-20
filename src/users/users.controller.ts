import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from './type/usersResponse.interface';
import { UserLoginDto } from './dto/userLogin.dto';
import  type { authRequest } from '@/types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { authGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

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
  @UseGuards(authGuard)
  async getCurrentUser(@User() user): Promise<IUserResponse>{
    return this.usersService.generateUserResponse(user)
  }

  @Put('users')
  @UseGuards(authGuard)
  async updateUser(@User('id') userId, @Body('user') updateUserDto: UpdateUserDto):Promise<IUserResponse>{
    const userUpdate= await this.usersService.updateUser(userId, updateUserDto)
    return this.usersService.generateUserResponse(userUpdate)
  }
}
