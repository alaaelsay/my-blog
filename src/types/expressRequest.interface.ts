import { UserEntity } from "@/users/users.entity";
import {Request} from 'express'
export interface authRequest extends Request{
    user: UserEntity
}