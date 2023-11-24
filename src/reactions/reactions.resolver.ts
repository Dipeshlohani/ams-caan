import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReactionService } from './reaction.service';
import { Reaction } from './reaction.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Add ObjectType decorator to define the GraphQL type
class ReactionsByActivityResponse {
  @Field(() => [Reaction]) // Assuming Reaction is the type of your reactions
  reactions: Reaction[];

  @Field(() => Int) // Use Int for the totalReactions count
  totalReactions: number;
}

@Resolver(() => Reaction)
export class ReactionsResolver {
  constructor(private readonly reactionsService: ReactionService) { }

  @Query(() => ReactionsByActivityResponse) // Use the defined GraphQL type
  async reactionsByActivity(
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    const reactions = await this.reactionsService.getReactionsByActivity(activityId);
    const totalReactions = reactions.length;
    return { reactions, totalReactions };
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
