import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './comment.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType() // Add ObjectType decorator to define the GraphQL type
class CommentsByActivityResponse {
  @Field(() => [Comment]) // Assuming Reaction is the type of your reactions
  comments: Comment[];

  @Field(() => Int) // Use Int for the totalReactions count
  totalComments: number;
}

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentService) { }

  // @Query(() => Comment)
  // async comments() {
  //   return this.commentsService.getComments();
  // }

  @Query(() => CommentsByActivityResponse)
  async commentsByActivity(
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    const comments = await this.commentsService.getCommentsByActivity(activityId);
    const totalComments = comments.length;
    return {comments, totalComments};
  }

  @Mutation(() => Comment)
  async createComment(
    @Args('content', { type: () => String }) content: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    return this.commentsService.createComment(content, userId, activityId);
  }
}
