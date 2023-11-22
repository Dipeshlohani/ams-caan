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

  @Mutation(() => Reaction)
  async updateReaction(
    @Args('reactionId', { type: () => String }) reactionId: string,
    @Args('newType', { type: () => String }) newType: string,
  ) {
    return this.reactionsService.updateReaction(reactionId, newType);
  }

  @Mutation(() => Boolean)
  async deleteReaction(
    @Args('reactionId', { type: () => String }) reactionId: string,
  ) {
    await this.reactionsService.deleteReaction(reactionId);
    return true;
  }



}
