import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CourtsModule } from './courts/courts.module';
import { NominatimModule } from './nominatim/nominatim.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zm2yods.mongodb.net/go-court?retryWrites=true&w=majority`,
    ),
    CourtsModule,
    NominatimModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
