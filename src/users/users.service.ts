import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {

    async createUser(createUserDto:CreateUserDto){
        console.log(createUserDto)
        return createUserDto
    }
}
