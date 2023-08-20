import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    async findOne(username:string): Promise<User | undefined> {
        return this.repository.findOne({where: {username}})
    }


}
