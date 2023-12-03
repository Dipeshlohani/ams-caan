import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) { }

  async createComment(
    content: string,
    userId: string,
    activityId: string,
  ): Promise<Comment> {
    const createdComment = new this.commentModel({
      content,
      userId,
      activityId,
    });
    return createdComment.save();
  }

  async getCommentsByActivity(activityId: string, limit: number = 10): Promise<Comment[]> {
    // Sort comments by createdAt in descending order and limit the result
    return this.commentModel.find({ activityId }).sort({ createdAt: -1 }).limit(limit).exec();
  }
}
