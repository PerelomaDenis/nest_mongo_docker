import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import * as path from 'path'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    // MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}/?retryWrites=true&w=majority`),
    MongooseModule.forRoot(`mongodb+srv://admin:admin@cluster0.ffwwnpb.mongodb.net/?retryWrites=true&w=majority`),
    AuthModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
