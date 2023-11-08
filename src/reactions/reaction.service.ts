import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction, ReactionDocument } from './reaction.model';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(Reaction.name) private reactionModel: Model<ReactionDocument>,
  ) { }

  async createReaction(
    userId: string,
    activityId: string,
    type: string,
  ): Promise<Reaction> {
    const createdReaction = new this.reactionModel({
      userId,
      activityId,
      type,
    });
    return createdReaction.save();
  }

  async getReactionsByActivity(activityId: string): Promise<Reaction[]> {
    return this.reactionModel.find({ activityId }).exec();
  }
}
