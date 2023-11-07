import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommentsService } from './comment.service';
import { Comment } from './comment.model';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) { }

  @Query(() => [Comment])
  async comments() {
    return this.commentsService.getComments();
  }

  @Query(() => [Comment])
  async commentsByActivity(
    @Args('activityId', { type: () => String }) activityId: string,
  ) {
    return this.commentsService.getCommentsByActivity(activityId);
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
