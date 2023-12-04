// shared-link.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedLink, SharedLinkDocument } from './shared.model';

@Injectable()
export class SharedLinkService {
  constructor(
    @InjectModel(SharedLink.name)
    private sharedLinkModel: Model<SharedLinkDocument>,
  ) {}

  async incrementShareCount(linkId: string): Promise<SharedLinkDocument> {
    const link = await this.sharedLinkModel.findByIdAndUpdate(
      linkId,
      { $inc: { shareCount: 1 } },
      { new: true },
    );

    return link;
  }
}
