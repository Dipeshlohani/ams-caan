import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.model';
import * as shortid from 'shortid';

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Query(() => [Activity])
  async activities() {
    return this.activitiesService.getActivities();
  }

  @Query(() => Activity)
  async activity(@Args('id', { type: () => String }) id: string) {
    return this.activitiesService.getActivityById(id);
  }

  @Mutation(() => Activity)
  async createActivity(
    @Args('title', { type: () => String }) title: string,
    @Args('description', { type: () => String }) description: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    const shareableLink = generateUniqueShareableLink(); // Generate a shareable link
    return this.activitiesService.createActivity(
      title,
      description,
      userId,
      shareableLink,
    );
  }
}

export function generateUniqueShareableLink() {
  return shortid.generate();
}
