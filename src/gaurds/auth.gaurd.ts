import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {Request} from "express"

@Injectable()
export class AuthGaurd implements CanActivate{

    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{

        const req = context.switchToHttp().getRequest();
        const token = this.extractToken(req);
        // req['user'] = token

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = this.jwtService.verifyAsync(token,{
                secret: this.configService.get<string>('JWT_SECRET')
            })
            req['user'] = payload;

        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractToken(request: Request):string|undefined {

        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}