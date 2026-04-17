import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { IUserResponse } from './type/usersResponse.interface';
import {sign, verify} from 'jsonwebtoken'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
    async createUser(createUserDto:CreateUserDto):Promise<IUserResponse>{
       const newUser= new UserEntity();

       Object.assign(newUser, createUserDto);


        const saveUser= await this.userRepository.save(newUser)
        return this.generateUserResponse(saveUser)
    }

    generateToken(user: UserEntity): string{
        console.log(process.env.JWT_SECRET)
        return sign({
            id:user.id,
            username:user.username,
            email:user.email
        }, process.env.JWT_SECRET)

        }

    generateUserResponse(user: UserEntity): IUserResponse{
        return {
            user:{
                ...user,
                token: this.generateToken(user)
            }
        }
    }
}
