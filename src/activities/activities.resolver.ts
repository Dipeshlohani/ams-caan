import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.model';

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Mutation(() => Activity)
  async createActivity(
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('userId') userId: string,
    @Args('shareableLink') shareableLink: string,
  ): Promise<Activity> {
    return this.activitiesService.createActivity(title, description, userId, shareableLink);
  }

  @Query(() => [Activity])
  async getActivities(): Promise<Activity[]> {
    return this.activitiesService.getActivities();
  }

  @Query(() => Activity)
  async getActivityById(@Args('id', { type: () => ID }) id: string): Promise<Activity> {
    return this.activitiesService.getActivityById(id);
  }
}
