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

  async getReactionsByActivity(activityId: string, limit: number = 10): Promise<Reaction[]> {
    // Sort reactions by createdAt in descending order and limit the result
    return this.reactionModel.find({ activityId }).sort({ createdAt: -1 }).limit(limit).exec();
  }

  async updateReaction(reactionId: string, newType: string): Promise<Reaction> {
    return this.reactionModel.findByIdAndUpdate(
      reactionId,
      { type: newType },
      { new: true },
    );
  }

  async deleteReaction(reactionId: string): Promise<void> {
    await this.reactionModel.findByIdAndDelete(reactionId);
  }
}




