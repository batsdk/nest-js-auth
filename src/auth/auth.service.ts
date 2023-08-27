import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(
            private userService: UsersService,
            private jwtService: JwtService,
        ) {}

    async singIn({username, password} : CreateUserDto): Promise<any>{
        const user = await this.userService.findOne(username)

        if (!user) {
            throw new BadRequestException("user Not found with the given username");
        }

        const [salt, storeHash] = user.password.split(".");

        const hash = await (scrypt(password, salt, 32)) as Buffer

        if (hash.toString("hex") != storeHash) {
            throw new UnauthorizedException("Wrong username or password");
        }

        const payload = {sub: user.id, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload),
            id: user.id
        }

    }

    async singUp({username, password} : CreateUserDto ){

        const isAlreadyAuthenticated = await this.userService.findOne(username);

        if (isAlreadyAuthenticated) {
            throw new BadRequestException("User already Registered");
        }

        const salt = randomBytes(8).toString("hex");
        const hash = await (scrypt(password, salt, 32)) as Buffer;
        const hashedPassword = salt+"."+hash.toString("hex");

        return this.userService.createUser(username, hashedPassword)

    }

}
