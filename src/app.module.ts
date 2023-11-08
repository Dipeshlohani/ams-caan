import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ActivitiesModule } from './activities/activities.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommentsModule } from './comments/comment.module';
import { Activity, ActivitySchema } from './activities/activity.model';
import { ReactionsModule } from './reactions/reaction.module';
import {UsersModule} from './user/user.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/activity-management'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql', // Provide the schema file
      driver: ApolloDriver,
    }),
    ActivitiesModule,
    CommentsModule,
    ReactionsModule,
    UsersModule,
  ],
})
export class AppModule { }