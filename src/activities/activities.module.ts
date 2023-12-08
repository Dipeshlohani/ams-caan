import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';
import { Activity, ActivitySchema } from './activity.model';
import { ReactionsModule } from '../reactions/reaction.module'; // Import the ReactionsModule
import { CommentsModule } from '../comments/comment.module'; // Import the CommentsModule


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
    ReactionsModule, // Include ReactionsModule in the imports array
    CommentsModule,
  ],
  providers: [ActivitiesResolver, ActivitiesService],
})
export class ActivitiesModule { }
