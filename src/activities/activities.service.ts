import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './activity.model';
import { ReactionService } from '../reactions/reaction.service'; // Import the ReactionService
import { CommentService } from '../comments/comment.service'; // Import the CommentService


@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    private readonly reactionService: ReactionService, // Inject the ReactionService
    private readonly commentsService: CommentService, // Inject the CommentService

    ) {}

  async createActivity(
    title: string,
    description: string,
    userId: string,
    shareableLink: string,
  ): Promise<Activity> {
    const createdActivity = new this.activityModel({
      title,
      description,
      userId,
      shareableLink,
    });
    return createdActivity.save();
  }

  async getActivities(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  async getActivityById(id: string): Promise<Activity> {
    return this.activityModel.findById(id).exec();
  }

  async getTotalComments(activityId: string): Promise<number> {
    const comment = await this.commentsService.getCommentsByActivity(activityId);
    return comment.length;
  }

  // New method to get total reactions for an activity
  async getTotalReactions(activityId: string): Promise<number> {
    const reactions = await this.reactionService.getReactionsByActivity(activityId);
    return reactions.length;
  }
}

