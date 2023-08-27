import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from "@nestjs/jwt"

@Module({
  providers: [AuthService],
  imports: [UsersModule,
    JwtModule.register({
      global:true,
      // * <-- TODO --> Use secrete in .env here
      secret: "Some Complex JWT Code",
      signOptions: {expiresIn: "3600s"}
    })
  ],
  controllers: [AuthController]
})
export class AuthModule {}
