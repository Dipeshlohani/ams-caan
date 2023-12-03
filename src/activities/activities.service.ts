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

    async getActivities(limit: number = 10): Promise<Activity[]> {
      // Sort activities by createdAt in descending order and limit the result
      return this.activityModel.find().sort({ createdAt: -1 }).limit(limit).exec();
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

    // Add the new method to update the share count
    async updateShareCount(activityId: string): Promise<Activity> {
      const activity = await this.activityModel.findById(activityId).exec();
      if (activity) {
        activity.shareCount = (activity.shareCount || 0) + 1;
        await activity.save();
      }
      return activity;
    }
  
}

