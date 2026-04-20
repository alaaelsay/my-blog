import { authRequest } from "@/types/expressRequest.interface";
import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";


export class authGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest<authRequest>();

        if(request.user.id){
            return true
        }

        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
    }
}