import { Resolver, Query, Args, Mutation, Root } from '@nestjs/graphql';
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

  @Query(() => Activity)
  async totalComments(@Root() activity: Activity) {
    return this.activitiesService.getTotalComments(activity._id);
  }

  @Query(() => Activity)
  async totalReactions(@Root() activity: Activity) {
    return this.activitiesService.getTotalReactions(activity._id);
  }

  @Mutation(() => Activity)
  async createActivity(
    @Args('title', { type: () => String }) title: string,
    @Args('description', { type: () => String }) description: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('imgUrls', { type: () => [String], defaultValue: [] })
    imgUrls: string[],
    @Args('files', { type: () => [String], defaultValue: [] })
    files: string[],
  ) {
    const shareableLink = generateUniqueShareableLink();
    return this.activitiesService.createActivity(
      title,
      description,
      userId,
      shareableLink,
      imgUrls,
      files,
    );
  }

  @Mutation(() => Activity)
  async updateActivity(
    @Args('activityId', { type: () => String }) activityId: string,
    @Args('title', { type: () => String, nullable: true }) title: string,
    @Args('description', { type: () => String, nullable: true })
    description: string,
    @Args('imgUrls', { type: () => [String], nullable: true })
    imgUrls: string[],
  ) {
    return this.activitiesService.updateActivity(
      activityId,
      title,
      description,
      imgUrls,
    );
  }

  @Mutation(() => Activity)
  async deleteActivity(
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    return this.activitiesService.deleteActivity(activityId);
  }

  // Add the new mutation for updating the share count
  @Mutation(() => Activity)
  async updateShareCount(
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    return this.activitiesService.updateShareCount(activityId);
  }
}

export function generateUniqueShareableLink() {
  return shortid.generate();
}
