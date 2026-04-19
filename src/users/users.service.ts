import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { IUserResponse } from './type/usersResponse.interface';
import {sign} from 'jsonwebtoken'
import { UserLoginDto } from './dto/userLogin.dto';
import {compare} from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

    async createUser(createUserDto:CreateUserDto):Promise<IUserResponse>{
       const newUser= new UserEntity();

       Object.assign(newUser, createUserDto);
        const userByUsername= await this.userRepository.findOne({
            where:{
                username:createUserDto.username
            }
        })

         const userByEmail= await this.userRepository.findOne({
            where:{
                email:createUserDto.email
            }
        })

        if(userByUsername || userByEmail){
            throw new HttpException('User or Email is already exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const saveUser= await this.userRepository.save(newUser)
        return this.generateUserResponse(saveUser)
    }

    async userLogin(userLoginDto: UserLoginDto):Promise<UserEntity>{
        // user
            const user= await this.userRepository.findOne({
                where:{
                    email: userLoginDto.email
                }
            })

            if(!user){
                throw new HttpException('Email or Password is wrong', HttpStatus.UNAUTHORIZED)
            }

        // match password
            const matchPassword= await compare(userLoginDto.password, user.password)

            if(!matchPassword){
                throw new HttpException('Email or Password is wrong', HttpStatus.UNAUTHORIZED)
            }

        // delete password
            delete user.password
        // return user
        return user
    }

    async findById(id: number){
        const user= await this.userRepository.findOne({
            where:{
                id,
            }
        })

        if(!user){
            throw new HttpException(`User with id ${id} not found`
                , HttpStatus.NOT_FOUND)
        }

        return user
    }
    generateToken(user: UserEntity): string{
        return sign({
            id:user.id,
            username:user.username,
            email:user.email
        }, process.env.JWT_SECRET)

        }

    generateUserResponse(user: UserEntity): IUserResponse{

        if(!user.id){
            throw new HttpException('User data is missing', HttpStatus.BAD_REQUEST)
        }
        return {
            user:{
                ...user,
                token: this.generateToken(user)
            }
        }
    }
}
