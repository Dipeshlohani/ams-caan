import { Resolver, Args, Mutation, Query, ID } from '@nestjs/graphql';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.model';
import { CommentInput } from './comment.input';

@Resolver(() => Activity) // Specify the type for the resolver
export class ActivitiesResolver {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Query(() => [Activity])
  async activities() {
    return this.activitiesService.findAll();
  }

  @Mutation(() => Activity) // Specify the return type here
  async createActivity(@Args('input') input: Activity) {
    return this.activitiesService.create(input);
  }

  @Mutation(() => Activity)
  async updateActivity(@Args('input') input: Activity) {
    return this.activitiesService.update(input._id, input);
  }

  @Mutation(() => Activity)
  async postComment(
    @Args('activityId') activityId: string,
    @Args('input') input: CommentInput,
  ) {
    return this.activitiesService.postComment(activityId, input);
  }

  @Mutation(() => Activity)
  async generateShareableLink(
    @Args('activityId', { type: () => ID }) activityId: string,
  ) {
    return this.activitiesService.generateShareableLink(activityId);
  }
}
