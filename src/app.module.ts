import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ActivitiesModule } from './activities/activities.module';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { CommentsModule } from './comments/comment.module';
import { Activity, ActivitySchema } from './activities/activity.model';
import { ReactionsModule } from './reactions/reaction.module';
import { UsersModule } from './user/user.module'
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {path:join(process.cwd(), 'src/schema.gql'),federation:2},
      playground: true,
      buildSchemaOptions: {
        orphanedTypes: [Activity],
      },
    }),
    
    MongooseModule.forRoot('mongodb://localhost/activity-management'),
    ActivitiesModule,
    CommentsModule,
    ReactionsModule,
    UsersModule,
  ],
 
})
export class AppModule { }