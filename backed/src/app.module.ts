import { ApolloDriver } from '@nestjs/apollo';
import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtMiddleware } from './JwtMiddleware/Jwt.middleware';

import { UserModule } from './user/user.module';
import { GraphqlModule } from './graphql/graphql.module';
import { ConnectionParams } from 'subscriptions-transport-ws';

import * as jwt from 'jsonwebtoken';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_ROOT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`dist/**/*.entity{ .ts,.js}`],
      synchronize: true,
    }),
    // userService의 접근하기 위하여
    // forRoot => forRootAsync로 변경
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [UserModule],
      useFactory: async (userService: UserService) => ({
        autoSchemaFile: true,
        playground: true,
        context: ({ req }) => ({ user: req['user'] }),
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': {
            onConnect: async (connectionParams: ConnectionParams) => {
              const token = connectionParams['acces_token'];
              const decoded = jwt.verify(token, process.env.JWT_KEY);

              if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                const user = await userService.findById(decoded.id);

                // console.log('user', user);
                return { user };
              }
            },
          },
        },
      }),
      inject: [UserService],
    }),
    UserModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
