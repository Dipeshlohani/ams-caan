// comment resolver
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './comment.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class CommentsByActivityResponse {
  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Int)
  totalComments: number;
}

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentService) { }

  @Query(() => CommentsByActivityResponse)
  async commentsByActivity(
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    const comments = await this.commentsService.getCommentsByActivity(activityId);
    const totalComments = comments.length;
    return { comments, totalComments };
  }

  @Mutation(() => Comment)
  async createComment(
    @Args('content', { type: () => String }) content: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    return this.commentsService.createComment(content, userId, activityId);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('commentId', { type: () => String }) commentId: string,
    @Args('content', { type: () => String }) content: string,
  ) {
    return this.commentsService.updateComment(commentId, content);
  }

  // @Mutation(() => Comment)
  // async deleteComment(
  //   @Args('commentId', { type: () => String }) commentId: string,
  // ) {
  //   return this.commentsService.deleteComment(commentId);
  // }
}
