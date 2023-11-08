import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './activity.model';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) { }

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
}
