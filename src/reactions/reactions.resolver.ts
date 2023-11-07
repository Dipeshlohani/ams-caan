import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReactionService } from './reaction.service';
import { Reaction } from './reaction.model';

@Resolver(() => Reaction)
export class ReactionsResolver {
  constructor(private readonly reactionsService: ReactionService) { }

  @Query(() => [Reaction])
  async reactionsByActivity(
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    return this.reactionsService.getReactionsByActivity(activityId);
  }

  @Mutation(() => Reaction)
  async createReaction(
    @Args('userId', { type: () => String }) userId: string,
    @Args('activityId', { type: () => String }) activityId: string,
    @Args('type', { type: () => String }) type: string,
  ) {
    return this.reactionsService.createReaction(userId, activityId, type);
  }
}
