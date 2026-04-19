import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import { authRequest } from "@/types/expressRequest.interface";
import {verify} from 'jsonwebtoken'
import { UserEntity } from "../users.entity";

@Injectable()
export class authMiddleware implements NestMiddleware{
    constructor(private readonly userService:UsersService){}

    async use(req: authRequest, res: Response, next: NextFunction) {
        if(!req.headers.authorization){
            req.user= new UserEntity();

            next()
            return;
        }

        const token= req.headers.authorization?.split(' ')[1]

        try{
            const decode = verify(token, process.env.JWT_SECRET)
            const user= await this.userService.findById(decode.id)

            req.user=user
            next();
        }catch(err){
            req.user= new UserEntity();
            next()
        }
    }
}