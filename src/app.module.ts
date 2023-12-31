import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'sqlite.db',
      entities: [User],
      synchronize:true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
