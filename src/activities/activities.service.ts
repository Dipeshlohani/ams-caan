import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './activity.model';
import { CommentInput } from './comment.input';
import * as shortid from 'shortid';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) { }

  async create(input: Activity): Promise<Activity> {
    const createdActivity = new this.activityModel(input);
    return createdActivity.save();
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  async update(id: string, update: Activity): Promise<Activity> {
    return this.activityModel.findByIdAndUpdate(id, update, {
      new: true,
    });
  }

  async postComment(
    activityId: string,
    input: CommentInput,
  ): Promise<Activity> {
    const activity = await this.activityModel.findById(activityId).exec();
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    const newComment = {
      commenterId: input.commenterId,
      text: input.text,
    };

    activity.comments.push(newComment);
    await activity.save();

    return activity;
  }

  async generateShareableLink(activityId: string): Promise<Activity> {
    const activity = await this.activityModel.findById(activityId).exec();
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    // Generate a unique shareable link (you can use a library like shortid for this)
    const shareableLink = generateUniqueShareableLink(); // Implement this function

    activity.shareableLink = shareableLink;
    await activity.save();

    return activity;
  }
}

export function generateUniqueShareableLink() {
  return shortid.generate();
}
