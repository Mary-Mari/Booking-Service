import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousesModule } from './houses/houses.module';
import { GlampingModule } from './glamping/glamping.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './controllers/admin/admin.module';
import { BookingModule } from './booking/booking.module';
import { ContactModule } from './contacts/contacts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'build'), // путь до билда React-приложения
    // }),
    HousesModule,
    GlampingModule,
    AuthModule,
    UsersModule,
    AdminModule,
    BookingModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
