import { IUser } from "./users.types";

export interface IUserResponse{
    user: IUser & {token:string}
}