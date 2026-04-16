import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
    async createUser(createUserDto:CreateUserDto):Promise<CreateUserDto>{
       const newUser= new UserEntity();
        console.log(createUserDto)
       Object.assign(newUser, createUserDto);


        return await this.userRepository.save(newUser)
    }
}
